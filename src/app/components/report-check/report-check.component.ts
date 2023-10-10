import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgxDropzoneModule, NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DocType } from 'src/app/models/doc.model';
import { ReportView, AttachFile } from 'src/app/models/form.model';
import { FormService } from 'src/app/services/form.service';
import { ReportService } from 'src/app/services/report.service';
import { MessagesModule } from 'primeng/messages';


@Component({
  selector: 'app-report-check',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    CommonModule,
    MenuModule,
    DialogModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    InputTextModule,
    ConfirmDialogModule,
    InputNumberModule,
    MessagesModule
  ],
  providers: [ConfirmationService, FormService, ReportService],
  templateUrl: './report-check.component.html',
  styleUrls: ['./report-check.component.scss']
})
export class ReportCheckComponent implements OnInit {

  selectedCategory!: any ;
  categories!: any[] ;
  multiple :boolean = true ;
  files: File[] = [];
 // total !: number
  
  @Input() 
  enableExam = false;
  @Input() 
  reportx: any;

  
  
  @Output() editFormChange = new EventEmitter<boolean>();
  @Output() reportChange = new EventEmitter<ReportView>();
  @Output() enabledChange = new EventEmitter<boolean>();
  
  enablePopup = this.enableExam
  damageCount:number = 0;
  incompleteCount:number = 0;
  incompleteCountContract:number = 0;
  goodCount:number = 0;

  
  


  constructor(
    private route: ActivatedRoute,
    private form: FormService,
    private r: ReportService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    console.log("report log",this.reportx)
   
    if (this.multiple) {
      this.categories =
        [
          { name: 'สภาพดี', key: 'A' },
          { name: 'พบปัญหา', key: 'E' },

        ]
    }
    else {
      this.categories =
        [
          { name: 'สภาพดี', key: 'A' },
          { name: 'มีความเสียหาย', key: 'B' },
          { name: 'ของไม่ครบ', key: 'C' },
          { name: 'ของไม่ครบตามสัญญา', key: 'D' }
        ]
    }
  }
  onShow(){
    this.goodCount = this.reportx.quantity
    console.log("report log show",this.reportx.quantity);
    if(this.reportx.quantity>1)
    {
      this.multiple = true ;
    }
    else
    {
      this.multiple = false ;
    }
    if (this.multiple) {
      this.categories =
        [
          { name: 'สภาพดี', key: 'A' },
          { name: 'พบปัญหา', key: 'E' },

        ]
    }
    else {
      this.categories =
        [
          { name: 'สภาพดี', key: 'A' },
          { name: 'มีความเสียหาย', key: 'B' },
          { name: 'ของไม่ครบ', key: 'C' },
          { name: 'ของไม่ครบตามสัญญา', key: 'D' }
        ]
    }
  }
  changeValueCount(val :any)
  {
    console.log("changeDamageCount",val);
    this.goodCount = this.reportx.quantity - this.damageCount -this.incompleteCount - this.incompleteCountContract
  }
  onHide(){
    this.enabledChange.emit(false);
    console.log("onHide") ;
  }
  changeproblem(event:any){
    console.log(event);
  }
  onSelect(event:any){
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event:any){
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  confirm1(){
   // this.enabledChange.emit(false);
 //   this.reportx.id = 9999;

 this.confirmationService.confirm({
  message: 'เลือก ตกลง เพื่อยันผลและส่งผลให้บริษัททราบ หรือ ย้อนกลับ เพื่อกลับตรวจสอบอีกครั้ง',
  header: 'ยืนยันการตรวจสอบเอกสาร',
  icon: 'pi pi-exclamation-triangle',
  accept: () => {
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
  },
  reject: (type: any) => {
     
  }
});


    this.reportChange.emit(this.reportx);
  }
}
