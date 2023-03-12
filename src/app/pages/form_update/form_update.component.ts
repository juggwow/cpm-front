
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  scan,
  shareReplay,
  switchMap,
  tap,
  take,
} from 'rxjs/operators';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormService } from '../../services/rad-form'
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { DocType ,Document,FilesAttach} from '../../models/doc.model'
import { ListDocument } from '../../models/doc.model';
import { Form } from 'src/app/models/form.model';
import { ListDocumentService } from "../../services/rad-listofdoc";
import { Upload } from 'src/app/models/upload.model';
import { RadCountryService } from "../../services/rad-country.service";
import { Country } from 'src/app/models/country.model';

@Component({
  providers: [FormService, ConfirmationService, ListDocumentService, RadCountryService],
  imports: [DropdownModule, CommonModule, InputTextModule, ButtonModule, ConfirmDialogModule, RouterModule, NgxDropzoneModule, FormsModule, ReactiveFormsModule, AutoCompleteModule],
  selector: 'app-form',
  standalone: true,
  templateUrl: './form_update.component.html',
  styleUrls: ['./form_update.component.scss']
})




export class FormUpdateComponent implements OnInit {



  DocFormGroup = new FormGroup({
    itemID: new FormControl(9551),
    itemName : new FormControl('',),
    arrival: new FormControl('', Validators.required),
    inspection: new FormControl('', Validators.required),
    taskMaster: new FormControl('', Validators.required),
    invoice: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    country: new FormControl(''),
    manufacturer: new FormControl(''),
    model: new FormControl(''),
    serial: new FormControl(''),
    peano: new FormControl(''),
    createby: new FormControl(''),
    status: new FormControl(''),
    filesAttach: new FormControl([] as Upload[] ),
  })


  files: File[] = [];

  doctype!: DocType[];
  document! : Document;
  filteredCountries!: Country[];
  countries!: Country[]
  filesAttach!:FilesAttach[]

  // selectedDocType!: DocType;

  constructor(private FormService: FormService, private confirmationService: ConfirmationService, private listOfDocumentService: ListDocumentService, private radCountryService: RadCountryService) {

  }

  ngOnInit(): void {
    this.getDocType()
    this.getCountries()
    this.listOfDocumentService.getDoc$().subscribe(
      result => {
        this.document = result
        this.DocFormGroup.controls.arrival.setValue(result.arrival)
        this.DocFormGroup.controls.peano.setValue(result.peano)
        this.DocFormGroup.controls.invoice.setValue(result.invoice)
        this.DocFormGroup.controls.manufacturer.setValue(result.manufacturer)
        this.DocFormGroup.controls.model.setValue(result.model)
        this.DocFormGroup.controls.taskMaster.setValue(result.taskMaster)
        this.DocFormGroup.controls.inspection.setValue(result.inspection)
        this.DocFormGroup.controls.country.setValue(result.country)
        this.DocFormGroup.controls.quantity.setValue(result.itemQty)
        this.DocFormGroup.controls.itemName.setValue(result.itemName)
        this.DocFormGroup.controls.serial.setValue(result.serial)
        this.filesAttach = result.filesAttach
      }
      
    )
  }

  getDocType() {
    this.listOfDocumentService.getListOfDocTypes().subscribe(
      data => {
        this.doctype = data
      },
      error => {
        console.log(JSON.stringify(error.error.message))
      },
      () => {
        console.log("get list of doctype done")
      }
    )
  }

  getCountries() {
    this.radCountryService.getCountryList().subscribe(
      data => {
        this.countries = data
      },
      error => {
        console.log(JSON.stringify(error.error.message))
      },
      () => {
        console.log("get the list of countries done")
      }
    )
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'ระบบจะส่งรายละเอียดใบตรวจรับอุปกรณ์ไฟฟ้า ให้ กฟภ. อนุมัติทันทีที่ท่านกด “ตกลง”',
      header: "ยืนยันการสร้างใบตรวจรับอุปกรณ์ไฟฟ้า",
      acceptLabel: "ตกลง",
      rejectLabel: "ยกเลิก",
      accept: () => {
        this.SendToPEA()
      }
    });
  }





  onSelectFileUpload(event: NgxDropzoneChangeEvent) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files)
    console.log(event.addedFiles)
    this.FormService.upload("upload","9551",event.addedFiles).subscribe(
      result => {

        const filesattach = this.DocFormGroup.controls.filesAttach.value
        filesattach?.push({...result,...{type:1}})
        this.DocFormGroup.controls.filesAttach.setValue(filesattach);


        console.log('Upload successful!', result);
        // Do something with the result here
      },
      error => {
        console.log('Error uploading file!', error);
        // Handle the error here
      }
    )
  }

  onRemoveFileUpload(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }



  SendToPEA() {
    let formvalue = this.DocFormGroup.value as Form
    this.FormService.addNewForm(
      { ...formvalue, ...{ status: 1, createby: "ทดสอบ" } }
    ).pipe(
      take(1),
      tap(() => {
        console.log('..')
        // this.appToastService.successToast();
        // this.router.navigate(['/']);
      })
    )
      .subscribe({
        error: () => console.log('error')//this.appToastService.errorToast(),
      });
  }


  SaveDraft() {
    let formvalue = this.DocFormGroup.value as Form
    this.FormService.addNewForm(
      { ...formvalue, ...{ status: 0, createby: "ทดสอบ" } }
    ).pipe(
      take(1),
      tap(() => {
        console.log('..')
        // this.appToastService.successToast();
        // this.router.navigate(['/']);
      })
    )
      .subscribe({
        error: () => console.log('error')//this.appToastService.errorToast(),
      });
  }

  filterCountries(event: any){
    let filtered: Country[] = [];
    let query = event.query;

    for(let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCountries = filtered;
  }

}




