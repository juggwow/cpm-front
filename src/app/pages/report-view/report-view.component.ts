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
import { EditReportComponent } from './edit-report/edit-report.component';

@Component({
  selector: 'app-report-view',
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
    EditReportComponent
  ]
  ,
  providers: [FormService, ReportService]
})
export class ReportViewComponent implements OnInit {

  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;
  
  role = 'A'
  
  display: boolean = false;

  contractId!: number;
  itemId!: number;
  reportId!: number;
  manageMenu: MenuItem[] = [];

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

  constructor(
    private route: ActivatedRoute,
    private form: FormService,
    private r: ReportService,
  ) { }  

  blob2Base64 = (blob: Blob): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result!.toString());
      reader.onerror = error => reject(error);
    })
  }

  ngOnInit(): void {
    this.contractId = Number(this.route.snapshot.parent?.paramMap.get('id'));
    this.itemId = Number(this.route.snapshot.paramMap.get('itemID'));
    this.reportId = Number(this.route.snapshot.paramMap.get('reportID'));
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
