
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { FormService } from './../../services/rad-form'
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { DocType } from './../../models/doc.model'
import { ListDocument } from './../../models/doc.model';
import { Form } from 'src/app/models/form.model';
import { ListDocumentService } from "./../../services/rad-listofdoc";

@Component({
  providers: [FormService, ConfirmationService, ListDocumentService],
  imports: [DropdownModule, CommonModule, InputTextModule, ButtonModule, ConfirmDialogModule, RouterModule, NgxDropzoneModule, FormsModule, ReactiveFormsModule],
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})




export class FormComponent implements OnInit {



  DocFormGroup = new FormGroup({
    itemID: new FormControl(9551),
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
  })


  files: File[] = [];

  doctype!: DocType[];


  // selectedDocType!: DocType;

  constructor(private FormService: FormService, private confirmationService: ConfirmationService, private listOfDocumentService: ListDocumentService) {

  }

  ngOnInit(): void {

    this.getDocType()

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


}




