import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReportView } from 'src/app/models/form.model';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

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
  @Input()  editForm!: boolean;
  @Output() editFormChange = new EventEmitter<boolean>();
  @Output() reportChange = new EventEmitter<ReportView>();

  constructor(
    private http: HttpClient,
  ) {}

  @Output() reportChange = new EventEmitter<ReportView>();

  ngOnInit(): void {
    this.setFormData()
  }

  fg = new FormGroup({
    arrival: new FormControl<string|Date>('',Validators.required),
    inspection: new FormControl<string|Date>('',Validators.required),
    id: new FormControl<number>(0,Validators.required),
    taskMaster: new FormControl<string>('test',Validators.required),
    invoice: new FormControl<string>('',Validators.required),
    quantity: new FormControl<number>(0,Validators.required),
    country: new FormControl<string>('',Validators.required),
    brand: new FormControl<string>('',Validators.required),
    model: new FormControl<string>('',Validators.required),
    serial: new FormControl<string>('',Validators.required),
    peano: new FormControl<string>('',Validators.required),
  })


  onSubmit(event:any){
    event.preventDefault()
    let body : any
    let url : string
    if(!this.fg.valid){
      return window.alert("กรุณากรอกข้อมูล")
    }
    switch(this.subFormShow){
      case 1 : {
        this.fg.value.arrival instanceof Date? this.fg.value.arrival = this.formatDate(this.fg.value.arrival):undefined
        this.fg.value.inspection instanceof Date? this.fg.value.inspection = this.formatDate(this.fg.value.inspection):undefined
        body = {
          arrival: this.fg.value.arrival,
          inspection: this.fg.value.inspection,
          taskMaster: this.fg.value.taskMaster
        }
        url = `${environment.apiUrl}/report-basic-detials/${this.report.id}`
        break
      }
      case 2 : {
        body = {
          invoice: this.fg.value.invoice,
        }
        url = `${environment.apiUrl}/report-basic-detials/${this.report.id}`
        break
      }
      case 3 : {
        body = {
          quantity: this.fg.value.quantity,
          country: this.fg.value.country,
          brand: this.fg.value.brand,
          model: this.fg.value.model,
          serial: this.fg.value.serial,
          peano: this.fg.value.peano,
        }
        url = `${environment.apiUrl}/report-basic-detials/${this.report.id}`
        break
      }
    }
    this.http.put(url, body)
      .pipe(
        catchError(() => {
          return throwError(()=>{
            window.alert("เกิดข้อผิดพลาด")
            this.editFormChange.emit(false)
          });
        })
      )
      .subscribe(()=>{
        this.reportChange.emit({...this.report,...(this.fg.value as ReportView)})
        this.setFormData()
      })
  }

  

  setFormData(){
    this.fg.patchValue(this.report)
    this.editFormChange.emit(false)
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
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
