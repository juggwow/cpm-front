
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


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
import {DocType} from './../../models/doc.model'


@Component({
  providers: [FormService,ConfirmationService],
  imports : [DropdownModule,CommonModule,InputTextModule,ButtonModule,ConfirmDialogModule,RouterModule,NgxDropzoneModule],
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  files: File[] = [];

  doctype!: DocType[];

  // selectedDocType!: DocType;

  constructor(private FormService: FormService,private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.doctype = [
      {name: 'Packing List', id: 'NY'},
      {name: 'ใบออกของ', id: 'RM'},
      {name: 'ใบ Shipping', id: 'LDN'},
      {name: 'Test report', id: 'IST'},
  ];
  }



  confirm() {
    this.confirmationService.confirm({
        message: 'ระบบจะส่งรายละเอียดใบตรวจรับอุปกรณ์ไฟฟ้า ให้ กฟภ. อนุมัติทันทีที่ท่านกด “ตกลง”',
        header:"ยืนยันการสร้างใบตรวจรับอุปกรณ์ไฟฟ้า",
        acceptLabel:"ตกลง",
        rejectLabel:"ยกเลิก",
        accept: () => {
            this.SendToPEA()
        }
    });
}



onSelectFileUpload(event:NgxDropzoneChangeEvent) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemoveFileUpload(event:any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}



  SendToPEA() {
    this.FormService.addNewForm(
      {
        "itemID": 10011,
        "arrival": "2021-09-09",
        "inspection": "2021-09-09",
        "taskMaster": "ผู้ควบคุมงาน บริษัท",
        "invoice": "A123",
        "quantity": 10,
        "country": "span",
        "manufacturer": "sintec",
        "model": "y2",
        "serial": "ad1233",
        "peano": "pea-123",
        "createby": "คนสร้าง เอกสาร",
        "status": 1
      }

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
