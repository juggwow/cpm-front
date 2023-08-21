import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-detail-view',
  standalone: true,
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    ButtonModule,
    RouterModule,
    CommonModule,
    MenuModule,
    DialogModule,
    PdfViewerModule,
    ImageModule,
    GalleriaModule,
    NgxDropzoneModule
  ],
  providers: [FormService, ReportService],
})
export class DetailViewComponent implements OnInit {
  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;
  // Non Mock
  // display: boolean = false;

  // contractId!: number;
  // itemId!: number;
  // reportId!: number;
  // manageMenu: MenuItem[] = [];

  // report: ReportView = {
  //   id: 0,
  //   itemID: 0,
  //   itemName: '',
  //   itemUnit: '',
  //   arrival: '',
  //   inspection: '',
  //   taskMaster: '',
  //   invoice: '',
  //   quantity: 0,
  //   country: '',
  //   brand: '',
  //   model: '',
  //   serial: '',
  //   peano: '',
  //   attachFiles: []
  // };
  // doctype!: DocType[];
  // isFile: boolean = false
  // file!: AttachFile[];

  // src: string = "";

  //For Mock

  comment: Comment = {
    overAll: 'รับของเรียบร้อย',
    problem: {
      damage: 2,
      lost: 1,
    },
    noProblem: 2,
    images: [
      {
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
      },
      {
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      },
      {
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
      },
      // {
      //   src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg'
      // },
      // {
      //   src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg'
      // },
      // {
      //   src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg'
      // },
      // {
      //   src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg'
      // },
      // {
      //   src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg'
      // },
      {
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg',
      },
    ],
    extraComment: 'test test test',
  };

  display: boolean = false;
  contractId: number = 1;
  itemId: number = 1;
  reportId: number = 1;
  manageMenu: MenuItem[] = [];

  report: ReportView = {
    id: 1,
    itemID: 1,
    itemName:
      'On-load tap-changing power transformer three-phase, 115-22 kV, 30/40/50 MVA (Dyn1)',
    itemUnit: 'set',
    arrival: '17/08/2564',
    inspection: '18/07/2564',
    taskMaster: 'สมชาย สุรัตน์',
    invoice: 'J397/Equipmen',
    quantity: 2,
    country: 'thailand',
    brand: 'No brand',
    model: 'No Model',
    serial: 'No Serial',
    peano: 'No PEANo',
    attachFiles: [
      {
        id: 1,
        name: 'test.pdf',
        size: '3',
        unit: 'MB',
        typeID: 1,
        typeName: 'test 1',
      },
      {
        id: 2,
        name: 'test2.pdf',
        size: '3',
        unit: 'GB',
        typeID: 2,
        typeName: 'test 2',
      },
    ],
  };

  doctype: DocType[] = [
    {
      name: 'test 1',
      id: 1,
    },
    {
      name: 'test 2',
      id: 2,
    },
  ];

  isFile: boolean = false;
  file!: AttachFile[];

  files: File[] = [];

  src: string = '';

  constructor(
    private route: ActivatedRoute,
    private form: FormService,
    private r: ReportService
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
    // this.contractId = Number(this.route.snapshot.parent?.paramMap.get('id'));
    // this.itemId = Number(this.route.snapshot.paramMap.get('itemID'));
    // this.reportId = Number(this.route.snapshot.paramMap.get('reportID'));
    // if (this.reportId) {
    //   this.form.getListOfDocTypes<DocType[]>()
    //     .subscribe((res) => { this.doctype = res; });
    //   this.form.reportView<ReportView>(this.reportId)
    //     .subscribe((res) => { this.report = { ...this.report, ...res } });
    // }
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

  onHide() {
    // this.display = false;
    // URL.revokeObjectURL(this.src);
    this.pdfComponent.clear();
  }

  onSelectFileUpload(event: any) {
    this.files.push(...event.addedFiles);
    //check file type and size
  }

  onRemoveFileUpload(event: any, index: number) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

  }

  b2s = function (bytes: number) {
    const sizes = ["Bytes","KB","MB","GB","TB"]
    if(bytes == 0){return "n/a"}
    const i = ~~(Math.log2(bytes)/10)
    if(i == 0){return bytes + " " + sizes[i]}
    return (bytes / Math.pow(1024,i)).toFixed(2) + " " + sizes[i]
  }

  
}

interface Comment {
  overAll: 'พบปัญหา' | 'รับของเรียบร้อย';
  problem: {
    damage: number;
    lost: number;
  };
  noProblem: number;
  images: {
    src: string;
  }[];
  extraComment: string;
}
