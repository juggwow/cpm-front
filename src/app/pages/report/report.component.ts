import { Component, OnInit, ViewChild } from '@angular/core';
import { ListDocumentService } from 'src/app/services/rad-listofdoc';
import { ConfirmationService, MenuItem, PrimeIcons, SortEvent } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { TableModule, } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReportItem, ReportProgress } from 'src/app/models/report.model';
import { BoqService } from 'src/app/services/boq.service';
import { ReportService } from 'src/app/services/report.service';
import { PageEvent } from 'src/app/models/paginator.model';
import { Item, ResponsePage } from 'src/app/models/response-page.model';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-report',
  standalone: true,
  providers: [ListDocumentService, ConfirmationService, BoqService, ReportService],
  imports: [ConfirmDialogModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    RippleModule,
    RouterModule,
    BadgeModule,
    ContextMenuModule,
    PdfViewerModule,
    DialogModule,
    BreadcrumbModule,
    PaginatorModule,
    MenuModule,
    ToastModule,
    CommonModule
  ],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})



export class ReportComponent implements OnInit {
  
  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;

  is_preview: boolean = false;

  contractId!: number;
  itemId!: number;
  itemDetail: Item = {
    id: 0,
    name: '',
    contractQTY: '',
    deliveredQTY: '',
    quantity: 0,
    unit: ''
  };
  items: MenuItem[] = [];
  projectName: string = "...";

  allAmount: number = 0;
  allComplete: number = 0;
  allIncomplate: number = 0;
  checkAmount: number = 0;
  checkGood: number = 0;
  checkWaste: number = 0;
  progressAmount: number = 0;

  loading: boolean = true;

  data!: ReportItem[];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  page: number = 1;

  sort: HttpParams = new HttpParams();
  search: HttpParams = new HttpParams();

  reportManageMenu: MenuItem[] = [];

  private user_keyup_timeout: any;
  src: string = "";
  display: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private ListDocumentService: ListDocumentService,
    private boqService: BoqService,
    private route: ActivatedRoute,
    private report: ReportService
  ) { }

  ngOnInit(): void {
    this.contractId = Number(this.route.snapshot.parent?.paramMap.get('id'));
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.boqService.getProjectDetail(this.contractId)
      .subscribe((res) => {
        this.projectName = res.name;
        this.items = [
          { label: 'บริหารจัดการสัญญา' },
          { label: 'บริหารสัญญา' },
          { label: this.projectName },
          { label: 'Receive and Damage' }
        ];
      });
    this.boqService.getCardDetail(this.contractId)
      .subscribe((res) => {
        this.allAmount = res.all.Amount;
        this.allComplete = res.all.Complete;
        this.allIncomplate = res.all.Incomplete
        this.checkAmount = res.check.Amount;
        this.checkGood = res.check.Good;
        this.checkWaste = res.check.Waste;
        this.progressAmount = res.progress.Amount;
      });
    this.fetchData(this.itemId);

    // this.items = [
    //   {
    //     label: 'แก้ไข', icon: 'pi pi-pencil', command: () => {
    //       this.router.navigate(['/formupdate']);
    //     },
    //   },
    //   {
    //     label: 'Preview เอกสาร ', icon: 'pi pi-eye', command: () => {
    //       this.showPreview();
    //     },
    //   },
    //   {
    //     label: 'ลบเอกสาร', icon: 'pi pi-trash', command: () => {
    //       this.confirmDelete()
    //     }
    //   },

    // ];
  }



  confirmDelete() {
    this.confirmationService.confirm({
      message: 'เลือก ตกลง เพื่อลบ หรือ ย้อนกลับ เพื่อกลับไปหน้าเดิม',
      header: "คุณต้องการลบรายการนี้หรือไม่”",
      acceptLabel: "ตกลง",
      rejectLabel: "ยกเลิก",
      accept: () => {

        this.ListDocumentService.deleteDoc().subscribe((result) => {
          console.log(result)

        })

      }
    });
  }


  showPreview() {
    this.is_preview = true;
  }

  fetchData(id: number, params?: HttpParams) {
    this.loading = true;
    this.report.getReportByItem<ResponsePage<ReportItem>>(id, params)
      .subscribe((res) => {
        this.data = res.doc;
        this.itemDetail = res.item;
        this.totalRecords = res.total;
        this.rows = res.limit;
        this.first = (res.page - 1) * this.rows;
        this.page = res.page;
        this.loading = false;
      });
  }

  setParams(): HttpParams {
    let params = new HttpParams({
      fromObject: {
        'page': this.page,
        'limit': this.rows
      }
    });
    for (var key of this.sort.keys()) {
      params = params.set(key, this.sort.get(key)!)
    }
    for (var key of this.search.keys()) {
      params = params.set(key, this.sort.get(key)!)
    }
    return params;
  }

  onPageChange(event: PageEvent, id: number) {
    this.loading = true;
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + 1;
    this.fetchData(id, this.setParams());
  }

  onSortColumn(event: SortEvent, id: number) {
    let order = (event.order == 1) ? "asc" : "desc";
    this.sort = this.sort.set(event.field!, order);
    this.fetchData(id, this.setParams());
  }

  // onFilterColumn(key: string, event: Event) {
  //   let filterValue = (event.target as HTMLInputElement).value;

  //   if (filterValue == "") {
  //     delete this.queryParams[key]
  //   } else {
  //     this.queryParams[key] = filterValue;
  //   }

  //   this.fetchDataWhenSortOrFilter()
  // }

  onFilterColumn(key: string, event: Event) {
    if (this.user_keyup_timeout) {
      clearTimeout(this.user_keyup_timeout);
    }

    let filterValue = (event.target as HTMLInputElement).value;

    if (filterValue == "") {
      // delete this.queryParams[key]
    } else {
      // this.queryParams[key] = filterValue;
    }

    this.user_keyup_timeout = setTimeout(() => {
      this.fetchData(this.contractId);
    }, 1000);
  }

  onClearFilter(key: string) {
    console.log("clear", key)
  }



  // fetchAllData() {
  //   this.loading = true;
  //   this.ListDocumentService
  //     .getListOfDoc$().pipe(take(1))
  //     .subscribe((res) => {
  //       this.ListDocument = res.doc;
  //       console.log('xx', res)
  //       this.loading = false;
  //     });
  // }


  // fetchDataWhenSortOrFilter() {
  //   this.loading = true;
  //   const params = new HttpParams({ fromObject: this.queryParams })
  //   this.ListDocumentService.getSortOrFilterListOfDoc$(params)
  //     .subscribe((res) => {
  //       this.ListDocument = res.data;
  //       this.loading = false;
  //     })
  // }

  setReportDrafMenu(report: ReportProgress) {
    this.reportManageMenu = [
      {
        label: 'แก้ไข',
        icon: PrimeIcons.PENCIL,
        routerLink: `../report/${report.id}/edit`
      },
      {
        label: 'Preview เอกสาร',
        icon: PrimeIcons.EYE,
        command: () => {
          this.reportPreview(report.id)
        }
      },
      {
        label: 'ลบเอกสาร',
        icon: PrimeIcons.TRASH,
        command: () => {
          console.log(report.id)
        }
      }
    ];
  }
  setReportSubmitMenu(report: ReportProgress) {
    this.reportManageMenu = [
      {
        label: 'ดูรายละเอียด',
        icon: PrimeIcons.SEARCH,
        routerLink: `../report/${report.id}/view`
      },
      {
        label: 'Preview เอกสาร',
        icon: PrimeIcons.EYE,
        command: () => {
          this.reportPreview(report.id)
        }
      }
    ];
  }

  setReportManageMenu(report: ReportProgress) {
    if (report.stateID === 1) {
      this.setReportDrafMenu(report);
    } else {
      this.setReportSubmitMenu(report);
    }
  }

  reportPreview(id:number) {
    this.display = true;
    this.report.getPdfReport<Blob>(id).subscribe((response) => {
      // let file = new Blob([response], { type: 'application/pdf' });
      // var fileURL = URL.createObjectURL(file);
      this.src = URL.createObjectURL(response);
    })
  }

  onHide() {
    // this.display = false;
    // URL.revokeObjectURL(this.src);
    this.pdfComponent.clear();
    // console.log(this.pdfComponent.src);
  }


}
