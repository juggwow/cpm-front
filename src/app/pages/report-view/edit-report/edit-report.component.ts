import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReportView } from 'src/app/models/form.model';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss',],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    CalendarModule,
    ButtonModule,
    InputTextModule,
  ]
})
export class EditReportComponent implements OnInit {
  @Input() role!: string
  @Input() subFormShow!: 1|2|3
  @Input()  report!: ReportView;
  @Output() reportChange = new EventEmitter<ReportView>();

  ngOnInit(): void {
    this.setFormData()
  }

  fg = new FormGroup({
    arrival: new FormControl<string>(''),
    inspection: new FormControl<string>(''),
    id: new FormControl<number>(0),
    taskMaster: new FormControl<string>('test'),
    invoice: new FormControl<string>(''),
    quantity: new FormControl<number>(0),
    country: new FormControl<string>(''),
    brand: new FormControl<string>(''),
    model: new FormControl<string>(''),
    serial: new FormControl<string>(''),
    peano: new FormControl<string>(''),
  })

  editForm : boolean = false


  onSubmit(event:any){
    event.preventDefault()
    console.log(this.fg.value)
    this.reportChange.emit({...this.report,...(this.fg.value as ReportView)})
    this.setFormData()
    this.editForm = false
  }

  setFormData(){
    this.fg.patchValue(this.report)
  }
}
