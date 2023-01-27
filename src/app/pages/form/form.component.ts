
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
@Component({
  providers: [FormService],
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private FormService: FormService) {

  }

  ngOnInit(): void {
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
