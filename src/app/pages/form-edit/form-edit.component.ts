import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule, AutoCompleteModule],
  selector: 'app-form-edit',
  standalone: true,
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {
  public fg!: FormGroup;

  contractId!: number;
  items: MenuItem[] = [];
  projectName: string = "...";

  itemId!: number;
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
    attachFiles: []
  };

  delAttachFiles: Number[] = [];
  changeAttachFilesType: { fileId: number; typeId: number; }[] = [];

  constructor(
    private FormService: FormService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private boqService: BoqService,
    private form: FormService,
    public fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.contractId = Number(this.route.snapshot.parent?.paramMap.get('id'));
    this.itemId = Number(this.route.snapshot.paramMap.get('itemID'));
    this.reportId = Number(this.route.snapshot.paramMap.get('reportID'));
    // this.getDocType();
    // this.getCountries();
    if (this.reportId) {
      this.form.reportView<ReportView>(this.reportId)
        .subscribe((res) => {
          this.report = { ...this.report, ...res };
          this.fg.patchValue(this.report);
          this.getDocType();
          this.getCountries();
          // this.countries?.map((o) => {
          //   if (o.code == this.report.country) {
          //     this.fg.patchValue({ country: o });
          //     console.log(this.fg.get(`country`)?.value)
          //   }
          // });

          this.boqService.getProjectDetail(this.contractId)
            .subscribe((res) => {
              this.items = [
                { label: 'บริหารจัดการสัญญา' },
                { label: 'บริหารสัญญา' },
                { label: res.name },
                { label: 'Receive and Damage' },
                { label: `${this.report.itemName.slice(0, 25)}...` }
              ];
            });
          // this.files.push(this.report.attachFiles);
        });
    }

    // this.getDocType();
    // this.getCountries();


    this.fg = this.fb.group({
      // itemName: [''],
      arrival: [''],
      inspection: [''],
      taskMaster: [''],
      invoice: [''],
      quantity: [''],
      country: [''],
      brand: [''],
      model: [''],
      serial: [''],
      peano: [''],
      createby: ['']
      // status: ['']
      // filesAttach: new FormControl([] as Upload[])
      // docType: new FormControl([] as Upload[])
    })

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
        console.log(`country=>>${this.report.country}`)
        this.countries?.map((o) => {
          if (o.code == this.report.country) {
            this.fg.patchValue({ country: o });
            console.log(this.fg.get(`country`)?.value)
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
    console.log(this.filesAttachType.toString());
  }

  onBack() {
    this.confirmationService.confirm({
      message: 'กด "ยืนยัน" หากต้องการยกเลิกโดยไม่บันทึกการเปลี่ยนแปลง',
      header: `ยืนยันยกเลิกโดย "ไม่บันทึก" หรือไม่`,
      acceptLabel: "ยืนยัน",
      rejectLabel: "ยกเลิก",
      accept: () => {
        this.router.navigate(['/contract', this.contractId, 'item', this.itemId, 'report']);
      }
    });
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
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'บันทึกไม่สำเร็จ' });
        },
        complete: () => {
          this.show(status);
          setTimeout(() => {
            this.router.navigate(['/contract', this.contractId, 'item', this.itemId, 'report']);
          }, 1000);
        }
      });
  }

  show(status: string) {
    if (status === "1") {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'บันทึกร่างสำเร็จ' });
    } else {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ส่งให้ กฟภ.สำเร็จ' });
    }
  }
}

