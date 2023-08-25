import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DocType } from 'src/app/models/doc.model';
import { ReportView, AttachFile } from 'src/app/models/form.model';
import { FormService } from 'src/app/services/form.service';
import { ReportService } from 'src/app/services/report.service';
import { DialogModule } from 'primeng/dialog';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';import { EditReportComponent } from './edit-report/edit-report.component';

@Component({

  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
  imports: [
    ButtonModule,
    RouterModule,
    CommonModule,
    MenuModule,
    DialogModule,
    PdfViewerModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    InputTextModule,
    ConfirmDialogModule,
    InputNumberModule,

    EditReportComponent
  ]
  ,
  providers: [ConfirmationService ,FormService, ReportService]
})
export class ReportViewComponent implements OnInit {

  @ViewChild(PdfViewerComponent)
  value5=2;

  value : string ="xxxx";
  damageCount : number =22;
  incompleteCount : number = 0 ;
  incompleteCountContract : number = 0 ;
  goodCount  : number = 0 ;
//////
  private pdfComponent!: PdfViewerComponent;
  files: File[] = [];
  
  role = 'A'
  filesAttachType: Number[] = [];
  display: boolean = false;
  displayExam: boolean = false;
  multiple :boolean = true ;
  contractId!: number;
  itemId!: number;
  reportId!: number;
  manageMenu: MenuItem[] = [];
  UserRole :number = 1 ;
  ingredient: any = null;
  plug=1;
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
    attachFiles: [],
    stateName: '',
    stateID: 0
  };
  doctype!: DocType[];
  isFile: boolean = false
  file!: AttachFile[];

  src: string = "";

  selectedCategory: any = null;

    categories!: any[]
    b2s = function (bytes: number) {
      const sizes = ["Bytes","KB","MB","GB","TB"]
      if(bytes == 0){return "n/a"}
      const i = ~~(Math.log2(bytes)/10)
      if(i == 0){return bytes + " " + sizes[i]}
      return (bytes / Math.pow(1024,i)).toFixed(2) + " " + sizes[i]
    }
  constructor(
    private route: ActivatedRoute,
    private form: FormService,
    private r: ReportService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
  ) { }

  ////tabe Edite
  changeproblem(evevt:any)
  {
    console.log("change input",evevt)
  }
 ///////////////

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: () => {

        }
    });
}

onSelect(event:any) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event: File) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

  blob2Base64 = (blob: Blob): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result!.toString());
      reader.onerror = error => reject(error);
    })
  }
  selectType(event: any, index: number) {
    this.filesAttachType[index] = event.value.id
    // console.log(this.filesAttachType.toString());
  }
  onSelectFileUpload(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
    //check file type and size
  }

  onRemoveFileUpload(event: any, index: number) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.filesAttachType.splice(index, 1);

  }

  ngOnInit(): void {
//    this.problemCount = 200 ;
   // this.selectedCategory = this.categories[1];

    // { name: 'สภาพดี', key: 'A' },
    // { name: 'มีความเสียหาย', key: 'B' },
    // { name: 'ของไม่ครบ', key: 'C' },
    // { name: 'ของไม่ครบตามสัญญา', key: 'D' }
if(this.multiple)
{
  this.categories =
  [
      { name: 'สภาพดี', key: 'A' },
      { name: 'พบปัญหา', key: 'E' },

  ]
}
else
{
 this.categories =
    [
        { name: 'สภาพดี', key: 'A' },
        { name: 'มีความเสียหาย', key: 'B' },
        { name: 'ของไม่ครบ', key: 'C' },
        { name: 'ของไม่ครบตามสัญญา', key: 'D' }
    ]
}
    this.contractId = Number(this.route.snapshot.parent?.paramMap.get('id'));
    this.itemId = Number(this.route.snapshot.paramMap.get('itemID'));
    this.reportId = Number(this.route.snapshot.paramMap.get('reportID'));
    console.log("this.reportId",this.reportId);
    if (this.reportId) {
      this.form.getListOfDocTypes<DocType[]>()
        .subscribe((res) => { this.doctype = res; });

      this.form.reportView<ReportView>(this.reportId)
        .subscribe((res) => { this.report = { ...this.report, ...res } });
    }
  }

  ShowMenuManage(id: number, filename: string) {
    this.manageMenu = [
      {
        label: 'Download เอกสาร',
        icon: PrimeIcons.DOWNLOAD,
        // url: `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/download/${id}`
        // routerLink: ['/file',id]
        command: () => {
          this.fileDownload(id, filename)
          // console.log("report.id");
        }
      },
      {
        label: 'Preview เอกสาร',
        icon: PrimeIcons.EYE,
        command: () => {
          this.filePreview(id)
          // console.log("report.id");
        }
      }
    ];
  }

  filteredAttachFiles(typeid: number) {
    if (this.report.attachFiles.length > 0) {
      this.file = this.report.attachFiles.filter((a) => a.typeID == typeid);
      if (this.file.length > 0) {
        this.isFile = true;
      } else {
        this.isFile = false;
      }
      return this.isFile
    }
    return this.report.attachFiles;
  }

  reportPreview() {
    this.display = true;
    this.r.getPdfReport<Blob>(this.reportId).subscribe((response) => {
      // let file = new Blob([response], { type: 'application/pdf' });
      // var fileURL = URL.createObjectURL(file);
      this.src = URL.createObjectURL(response);
    })
  }

  filePreview(id: number) {
    this.display = true;
    this.r.getFileAttach<Blob>(id).subscribe((response) => {
      this.src = URL.createObjectURL(response);
    })
  }

  fileDownload(id: number, fileName: string) {
    this.r.getFileAttach<Blob>(id).subscribe((response) => {
      this.blob2Base64(response).then(res => this.downloadPDF(res, `${fileName}`))
    })
  }

  downloadPDF(pdfBase64: string, fileName: string) {
    const linkSource = pdfBase64;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  onHide() {
    // this.display = false;
    // URL.revokeObjectURL(this.src);
    this.pdfComponent.clear();
  }

}
