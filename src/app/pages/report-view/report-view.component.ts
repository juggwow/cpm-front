import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DocType } from 'src/app/models/doc.model';
import { ReportView, AttachFile } from 'src/app/models/form.model';
import { FormService } from 'src/app/services/form.service';
import { ReportService } from 'src/app/services/report.service';
import { DialogModule } from 'primeng/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    CommonModule,
    MenuModule,
    DialogModule,
    PdfViewerModule,
  ]
  ,
  providers: [FormService, ReportService]
})
export class ReportViewComponent implements OnInit {

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
    attachFiles: []
  };
  doctype!: DocType[];
  isFile: boolean = false
  file!: AttachFile[];

  src: string = "";
  fileSrc: string = "";

  constructor(
    private route: ActivatedRoute,
    private form: FormService,
    private r: ReportService
  ) { }

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

  ShowMenuManage(id: number) {
    this.manageMenu = [
      {
        label: 'Download เอกสาร',
        icon: PrimeIcons.DOWNLOAD,
        // url: `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/download/${id}`
        // routerLink: ['/file',id]
        command: () => {
          this.fileDownload(id)
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

  clickEvent() {
    this.display = true;
    this.r.getPdfReport(this.reportId).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      this.src = fileURL;
      // window.open(fileURL);
      // URL.revokeObjectURL(fileURL);
    })
  }

  filePreview(id: number) {
    this.display = true;
    this.r.getFileAttach(id).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      this.src = fileURL;
      // window.open(fileURL);
      // URL.revokeObjectURL(fileURL);
    })
  }

  fileDownload(id: number) {
    this.r.getFileAttach(id).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // URL.revokeObjectURL(fileURL);
    })
  }

  onHide() {
    this.display = false;
    URL.revokeObjectURL(this.src);
    this.src = "";
    console.log(this.src);
  }

}
