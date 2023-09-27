import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule, ActivatedRoute,Router } from '@angular/router';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { DocType } from 'src/app/models/doc.model';
import { ReportView, AttachFile, Remark } from 'src/app/models/form.model';
import { FormService } from 'src/app/services/form.service';
import { ReportService } from 'src/app/services/report.service';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-pd-report-detail',
  templateUrl: './pd-report-detail.component.html',
  styleUrls: ['./pd-report-detail.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [FormService, ReportService],
  imports: [
    ButtonModule,
    RouterModule,
    CommonModule,
    MenuModule,
    DialogModule,
    PdfViewerModule,
    ImageModule,
    GalleriaModule,
    NgxDropzoneModule,
    CarouselModule,
  ],
})
export class PdReportDetailComponent implements OnInit {
  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;

  
  // Non Mock
  display: boolean = false;

  contractId!: number;
  itemId!: number;
  reportId!: number;
  manageMenu: MenuItem[] = [];

  comment: Remark = {
    overAll: 'พบปัญหา',
    problem: {
      defect: 0,
      incomplate: 0,
      mismatch: 0
    },
    noProblem: 0,
    images: [],
    extraComment: ''
  }

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
    stateID: 0,
    comment: this.comment
  };
  doctype!: DocType[];
  isFile: boolean = false
  file!: AttachFile[];
  files: File|null = null;
  src: string = "";

  constructor(
    private route: ActivatedRoute,
    private form: FormService,
    private r: ReportService,
    private http: HttpClient,
    private router: Router
  ) {}

  blob2Base64 = (blob: Blob): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result!.toString());
      reader.onerror = (error) => reject(error);
    });
  };

  ngOnInit(): void {
    this.contractId = Number(this.route.snapshot.parent?.paramMap.get('id'));
    this.itemId = Number(this.route.snapshot.paramMap.get('itemID'));
    this.reportId = Number(this.route.snapshot.paramMap.get('reportID'));

    this.form.getListOfDocTypes<DocType[]>()
      .subscribe((res) => { this.doctype = res; });
    this.form.reportView<ReportView>(this.reportId)
      .subscribe((res) => { this.report = { ...this.report, ...res } });
  }

  ShowMenuManage(id: number, filename: string) {
    this.manageMenu = [
      {
        label: 'Download เอกสาร',
        icon: PrimeIcons.DOWNLOAD,
        // url: `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/download/${id}`
        // routerLink: ['/file',id]
        command: () => {
          this.fileDownload(id, filename);
          // console.log("report.id");
        },
      },
      {
        label: 'Preview เอกสาร',
        icon: PrimeIcons.EYE,
        command: () => {
          this.filePreview(id);
          // console.log("report.id");
        },
      },
    ];
  }

  showMenuRadFile(id: number, filename: string) {
    this.manageMenu = [
      {
        label: 'Download เอกสาร',
        icon: PrimeIcons.DOWNLOAD,
        command: () => {
          this.fileDownload(id, filename);
        },
      },
      {
        label: 'Preview เอกสาร',
        icon: PrimeIcons.EYE,
        command: () => {
          this.filePreview(id);
        },
      },
      
      {
        label: 'Delete เอกสาร',
        icon: PrimeIcons.TRASH,
        command: () => {
          window.alert("ยังไม่มี API");
        },
      },
    ];
  }

  showMenuPreviewBeforeUpload() {
    this.manageMenu = [
      {
        label: 'Delete เอกสาร',
        icon: PrimeIcons.TRASH,
        command: () => {
          this.onRemoveFileUpload();
        },
      },
      {
        label: 'Preview เอกสาร',
        icon: PrimeIcons.EYE,
        command: () => {
          this.filePreviewBeforeUpload();
        },
      },
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
      return this.isFile;
    }
    return this.report.attachFiles;
  }

  reportPreview() {
    this.display = true;
    this.r.getPdfReport<Blob>(this.reportId).subscribe((response) => {
      // let file = new Blob([response], { type: 'application/pdf' });
      // var fileURL = URL.createObjectURL(file);
      this.src = URL.createObjectURL(response);
    });
  }

  filePreviewBeforeUpload(){
    if(this.files){
      this.display = true;
      this.src = URL.createObjectURL(this.files)
    }
  }

  filePreview(id: number) {
    this.display = true;
    this.r.getFileAttach<Blob>(id).subscribe((response) => {
      this.src = URL.createObjectURL(response);
    });
  }

  fileDownload(id: number, fileName: string) {
    this.r.getFileAttach<Blob>(id).subscribe((response) => {
      this.blob2Base64(response).then((res) =>
        this.downloadPDF(res, `${fileName}`)
      );
    });
  }

  downloadPDF(pdfBase64: string, fileName: string) {
    const linkSource = pdfBase64;
    const downloadLink = document.createElement('a');

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  uploadSignedPDF() {
    if(this.files){
      const formData = new FormData();
      formData.append("upload", this.files);
      const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
      this.http.post(`${environment.apiUrl}/upload-pdfsign/${this.itemId}/${this.reportId}`, formData, { 'headers': headers })
      .pipe(
        catchError(() => {
          return throwError(()=>{
            window.alert("เกิดข้อผิดพลาดขณะอัปโหลดไฟล์")
            this.router.navigate([`/pd/contract/${this.contractId}/${this.itemId}/${this.reportId}`])
          });
        })
      )
      .subscribe(() => {
        window.alert("สำเร็จ")
        this.router.navigate([`/pd/contract/${this.contractId}/${this.itemId}/${this.reportId}`])
      });
    }
    else{
      window.alert("กรุณาแนบไฟล์")
    }
  }

  onHide() {
    // this.display = false;
    // URL.revokeObjectURL(this.src);
    this.pdfComponent.clear();
  }

  onSelectFileUpload(event: any) {
    this.files = event.addedFiles[0];
  }

  onRemoveFileUpload() {
    this.files = null;
  }

  b2s = function (bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) {
      return 'n/a';
    }
    const i = ~~(Math.log2(bytes) / 10);
    if (i == 0) {
      return bytes + ' ' + sizes[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  };
}
