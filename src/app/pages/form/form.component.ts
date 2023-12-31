import { CommonModule, Location } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { take, tap } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { DocType } from 'src/app/models/doc.model';
import { AttachFile, ReportView } from 'src/app/models/form.model';
import { Item } from 'src/app/models/response-page.model';
import { BoqService } from 'src/app/services/boq.service';
import { FormService } from 'src/app/services/form.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  providers: [FormService, ConfirmationService, BoqService, ReportService, MessageService],
  imports: [ToastModule, BreadcrumbModule, DropdownModule, CommonModule, InputTextModule, 
    ButtonModule, ConfirmDialogModule, RouterModule, NgxDropzoneModule, FormsModule, 
    AutoCompleteModule,ReactiveFormsModule],
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
})
export class FormComponent implements OnInit {
  public fg!: FormGroup;

  typeForm!: "edit"|"create"

  contractId!: number;
  items: MenuItem[] = [];
  projectName: string = "...";

  itemId!: number;
  itemDetial !: Item;
  reportId!: number;

  files: File[] = [];
  doctype!: DocType[];

  filteredCountries!: Country[];
  countries!: Country[];
  country?: string;

  filesAttach!: Number[];
  filesAttachType: Number[] = [];
  report: ReportView = {
    id: 0,
    itemID: 0,
    itemName: '',
    itemUnit: '',
    arrival: '',
    inspection: '',
    taskMaster: '',
    invoice: '',
    quantity: 0,
    country: '',
    brand: '',
    model: '',
    serial: '',
    peano: '',
    attachFiles: [],
    stateName: '',
    stateID: 0
  };

  delAttachFiles: Number[] = [];
  changeAttachFilesType: { fileId: number; typeId: number; }[] = [];
  
  b2s = function (bytes: number) {
    const sizes = ["Bytes","KB","MB","GB","TB"]
    if(bytes == 0){return "n/a"}
    const i = ~~(Math.log2(bytes)/10)
    if(i == 0){return bytes + " " + sizes[i]}
    return (bytes / Math.pow(1024,i)).toFixed(2) + " " + sizes[i]
  }

  constructor(
    private FormService: FormService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private boqService: BoqService,
    private form: FormService,
    public fb: FormBuilder,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.contractId = Number(this.route.snapshot.parent?.paramMap.get('id'));
    this.itemId = Number(this.route.snapshot.paramMap.get('itemID'));
    this.reportId = Number(this.route.snapshot.paramMap.get('reportID'));
    this.typeForm = <'edit'|'create'>this.route.snapshot.paramMap.get('typeForm')

    this.fg = this.fb.group({
      // itemID: [''],
      arrival: ['',Validators.required],
      inspection: ['',Validators.required],
      taskMaster: ['',Validators.required],
      invoice: ['',Validators.required],
      quantity: [3,Validators.required],
      country: ['',[
        Validators.required,
        (control: AbstractControl<Country|string>): null | { countryInvalid: boolean } => {
            if(typeof(control.value)=='string'){
              return {countryInvalid:true}
            }
            if(!this.countries.includes(control.value)){
              return {countryInvalid:true}
            }
            return null
          }
        ]
      ],
      brand: ['',Validators.required],
      model: ['',Validators.required],
      serial: ['',Validators.required],
      peano: ['',Validators.required],
      createby: [''],
      // status: ['']
      // filesAttach: new FormControl([] as Upload[])
      // docType: new FormControl([] as Upload[])
      // selectedCity: new FormControl<City | null>(null)
    })

    if (this.typeForm == "create"){
      this.boqService.getBoqItemDetail(this.itemId)
      .subscribe((res) => {
        this.itemDetial = { ...this.itemDetial, ...res };
        this.fg.patchValue({ quantity: `${this.itemDetial.quantity}` });

        this.getDocType();
          this.getCountries();

          this.boqService.getProjectDetail(this.contractId)
            .subscribe((res) => {
              this.items = [
                { label: 'บริหารจัดการสัญญา' },
                { label: 'บริหารสัญญา' },
                { label: res.workName},
                { label: 'Receive and Damage' },
                { label: `${this.itemDetial.name.slice(0, 25)}${this.itemDetial.name.length>25?'...':undefined}` }
              ];
            })
      })
    }
    else if (this.reportId && this.typeForm == 'edit') {
      this.form.reportView<ReportView>(this.reportId)
        .subscribe((res) => {
          this.report = { ...this.report, ...res };
          this.fg.patchValue(this.report);
          this.getDocType();
          this.getCountries();

          this.boqService.getProjectDetail(this.contractId)
            .subscribe((res) => {
              this.items = [
                { label: 'บริหารจัดการสัญญา' },
                { label: 'บริหารสัญญา' },
                { label: res.workName},
                { label: 'Receive and Damage' },
                { label: `${this.report.itemName.slice(0, 25)}${this.report.itemName.length>25?'...':undefined}` }
              ];
            })

        });
    }
    else{
      this.router.navigate(['/pages/notfound']);
    }
  }

  getDocType() {
    this.form.getListOfDocTypes<DocType[]>()
      .subscribe((res) => {
        this.doctype = res;
      });
  }

  getCountries() {
    this.form.getCountryList<Country[]>()
      .subscribe((res) => {
        this.countries = res;
        this.countries?.map((o) => {
          if (o.code == this.report.country) {
            this.fg.patchValue({ country: o });
          }
        });
      });
  }

  filterCountries(event: any) {
    let filtered: Country[] = [];
    let query = event.query;

    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCountries = filtered;
  }

  selectType(event: any, index: number) {
    this.filesAttachType[index] = event.value.id
    // console.log(this.filesAttachType.toString());
  }

  onBack() {
    if(this.fg.dirty){
      this.confirmationService.confirm({
        message: 'กด "ยืนยัน" หากต้องการยกเลิกโดยไม่บันทึกการเปลี่ยนแปลง',
        header: `ยืนยันยกเลิกโดย "ไม่บันทึก" หรือไม่`,
        acceptLabel: "ยืนยัน",
        rejectLabel: "ยกเลิก",
        accept: () => {
          this.location.back()
        }
      });
    }
    else{
      this.location.back()
    }
  }

  onConfirm() {
    this.confirmationService.confirm({
      message: 'ระบบจะส่งรายละเอียดใบตรวจรับอุปกรณ์ไฟฟ้า ให้ กฟภ. อนุมัติทันทีที่ท่านกด “ตกลง”',
      header: "ยืนยันการสร้างใบตรวจรับอุปกรณ์ไฟฟ้า",
      acceptLabel: "ตกลง",
      rejectLabel: "ยกเลิก",
      accept: () => {
        this.submitData("2");
      }
    });
  }

  onDraft() {
    // let formvalue = this.fg.value as Form
    this.submitData("1");
  }



  onSelectFileUpload(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
    //check file type and size

    // this.FormService.upload("upload", "9551", event.addedFiles).subscribe(
    //   result => {

    //     const filesattach = this.DocFormGroup.controls.filesAttach.value
    //     filesattach?.push({ ...result, ...{ type: 1 } })
    //     this.DocFormGroup.controls.filesAttach.setValue(filesattach);


    //     console.log('Upload successful!', result);
    //     // Do something with the result here
    //   },
    //   error => {
    //     console.log('Error uploading file!', error);
    //     // Handle the error here
    //   }
    // )
  }

  onRemoveFileUpload(event: any, index: number) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.filesAttachType.splice(index, 1);
  }

  removeOldAttachFile(f: AttachFile) {
    this.report.attachFiles.splice(this.report.attachFiles.indexOf(f), 1);
    this.delAttachFiles.push(f.id);
  }

  changeType(e: any, f: AttachFile) {
    console.log(`filenewid=${f.id}`);
    this.changeAttachFilesType.map((o) => {
      if (o.fileId == f.id) {
        this.changeAttachFilesType.splice(this.changeAttachFilesType.indexOf(o), 1);
      }
    })
    this.changeAttachFilesType.push({ fileId: f.id, typeId: e.value.id })
  }

  submitData(status: string) {
    let formData = new FormData();
    formData.append("itemID", this.itemId.toString());
    Object.keys(this.fg.controls).forEach(formControlName => {
      if (formControlName == 'country') {
        formData.append(formControlName, this.fg.get(formControlName)?.value.code);
      } else {
        formData.append(formControlName, this.fg.get(formControlName)?.value);
      }
    });
    formData.append("status", status);
    this.files.forEach(file => {
      formData.append("filesAttach", file);
    });
    formData.append("docType", this.filesAttachType.toString());

    
    if (this.typeForm == "create"){
      this.form.addNewReport(formData).pipe(
        take(1),
        tap(() => {
          console.log('..');    
        })
      )
        .subscribe({
          error: (err) => {
            let detail = `บันทึกไม่สำเร็จ: ${err.status}, ${err.statusText}`
            this.messageService.add({ severity: 'error', summary: 'Error', detail});
          },
          complete: () => {
            this.show(status);
            setTimeout(() => {
              this.router.navigate(['/contract', this.contractId, 'item', this.itemId, 'report']);
            }, 1000);
          }
        });
    }

    if (this.reportId && this.typeForm == 'edit'){
    formData.append("changeFileType", JSON.stringify(this.changeAttachFilesType));
    formData.append("removeFile", this.delAttachFiles.toString());

    this.form.editReport(formData, this.reportId).pipe(
      take(1),
      tap(() => {
        console.log('..');
        // this.show(status);        
        // // this.appToastService.successToast();
        // this.router.navigate(['/']);     
      })
    )
      .subscribe({
        error: (err) => {
          let detail = `บันทึกไม่สำเร็จ: ${err.status}, ${err.statusText}`
          this.messageService.add({ severity: 'error', summary: 'Error', detail});
        },
        complete: () => {
          this.show(status);
          setTimeout(() => {
            this.router.navigate(['/contract', this.contractId, 'item', this.itemId, 'report']);
          }, 1000);
        }
      });
    } 
  }

  show(status: string) {
    if (status === "1") {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'บันทึกร่างสำเร็จ' });
    } else {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ส่งให้ กฟภ.สำเร็จ' });
    }
  }

  checkCountryValid(){
    if(!this.countries.includes(this.fg.value.country)){
      this.messageService.add({ severity: 'info', summary: 'Info', detail: "กรุณาเลือกประเทศจากรายการที่แนะนำ"});
    }
  }
}

