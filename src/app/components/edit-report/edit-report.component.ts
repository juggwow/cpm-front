import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportView } from 'src/app/models/form.model';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { FormService } from 'src/app/services/form.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    AutoCompleteModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class EditReportComponent implements OnInit {
  @Input() subFormShow!: 1|2|3
  @Input()  report!: ReportView;
  @Input()  editForm!: boolean;
  @Output() editFormChange = new EventEmitter<boolean>();
  @Output() reportChange = new EventEmitter<ReportView>();

  filteredCountries!: string[];
  countries!: Country[];

  // mockCountries:Country[] = [{
  //   id: 0,
  //   code: "th",
  //   name: "Thailand"
  // },{
  //   id: 1,
  //   code: "en",
  //   name: "English"
  // },{
  //   id: 2,
  //   code: "sp",
  //   name: "Spain"
  // }]

  constructor(
    private http: HttpClient,
    private form: FormService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getCountries()
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
        url = `${environment.apiUrl}/report-basic-details/${this.report.id}`
        break
      }
      case 2 : {
        body = {
          invoice: this.fg.value.invoice,
        }
        url = `${environment.apiUrl}/report-delivery-number/${this.report.id}`
        break
      }
      case 3 : {
        let country!:string
        for (let i = 0; i < this.countries.length; i++){
          if(this.fg.value.country == this.countries[i].name){
            country = this.countries[i].code
            break;
          }
        }
        body = {
          quantity: String(this.fg.value.quantity),
          country,
          brand: this.fg.value.brand,
          model: this.fg.value.model,
          serial: this.fg.value.serial,
          peano: this.fg.value.peano,
        }
        url = `${environment.apiUrl}/report-equipment-details/${this.report.id}`
        break
      }
    }

    console.log(body)

    const update = ()=>{this.http.put(url, body)
      .pipe(
        catchError(() => {
          return throwError(()=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'บันทึกไม่สำเร็จ' });
            this.editFormChange.emit(false)
          });
        })
      )
      .subscribe(()=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'บันทึกสำเร็จ' });
        this.reportChange.emit({...this.report,...(this.fg.value as ReportView)})
        this.setFormData()
      })}
    
    this.confirmationService.confirm({
      message: 'ระบบจะเปลี่ยนแปลงข้อมูลเมื่อกด “ตกลง”',
      header: "ยืนยันการเปลี่ยนแปลง",
      acceptLabel: "ตกลง",
      rejectLabel: "ยกเลิก",
      accept: update
    });
  }

  patchValue(){
    this.fg.patchValue(this.report)
  }

  setFormData(){
    this.patchValue()
    this.editFormChange.emit(false)
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  filterCountries(event: any) {
    let filtered: string[] = [];
    let query = event.query;

    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country.name);
      }
    }
    this.filteredCountries = filtered;
  }

  getCountries() {
    this.form.getCountryList<Country[]>()
      .subscribe((res) => {
        this.countries = res;
      });
  }
}
