
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/cmdc-job.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobPageOption } from 'src/app/models/response-page.model';
import { PaginatorModule } from 'primeng/paginator';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    scan,
    shareReplay,
    switchMap,
    tap,
} from 'rxjs/operators';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-form',
  standalone : true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
