import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';
import { ConfirmationService, MenuItem, SortEvent, PrimeIcons } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { take, tap } from 'rxjs';
import { ReportItem, ReportProgress } from 'src/app/models/report.model';
import { Item, ResponsePage } from 'src/app/models/response-page.model';
import { BoqService } from 'src/app/services/boq.service';
import { ListDocumentService } from 'src/app/services/rad-listofdoc';
import { ReportService } from 'src/app/services/report.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-pd-item-report-list',
  templateUrl: './pd-item-report-list.component.html',
  styleUrls: ['./pd-item-report-list.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ListDocumentService, ConfirmationService, ReportService],
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
    CommonModule,
    MatIconModule
  ],
})
export class PdItemReportListComponent implements OnInit{
  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;

  is_preview: boolean = false;

  contractId!: number;
  itemId!: number;
  itemDetail: Item = {
    id: 0,
    name: '',
    contractQTY: '',
    receiveQTY: '',
    quantity: 0,
    unit: ''
  };
  items: MenuItem[] | undefined;
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
    this.itemId = Number(this.route.snapshot.paramMap.get('itemID'));
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
    this.sort = this.sort.set('sortRowNo', 'desc');
    this.fetchData(this.itemId, this.setParams());
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
      params = params.set(key, this.search.get(key)!)
    }
    return params;
  }

  onSortColumn(event: SortEvent) {
    let order = (event.order == 1) ? "asc" : "desc";
    for (var key of this.sort.keys()) {
      this.sort = this.sort.delete(key)
    }
    this.sort = this.sort.set(event.field!, order);
    this.fetchData(this.itemId!, this.setParams());
  }

  onClearFilter(key: string) {
    this.search = this.search.delete(key);
    this.fetchData(this.itemId!, this.setParams());
  }

  onFilterColumn(key: string, event: Event) {
    if (this.user_keyup_timeout) {
      clearTimeout(this.user_keyup_timeout);
    }

    let value = (event.target as HTMLInputElement).value;

    if (value == "") {
      this.search = this.search.delete(key);
    } else {
      this.search = this.search.set(key, value);
    }

    this.user_keyup_timeout = setTimeout(() => {
      this.fetchData(this.itemId!, this.setParams());
    }, 3000);
  }


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
          this.ReportDelete(report.id);
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

  reportPreview(id: number) {
    this.display = true;
    this.report.getPdfReport<Blob>(id).subscribe((response) => {
      this.src = URL.createObjectURL(response);
    })
  }

  onHide() {
    this.pdfComponent.clear();
  }

  ReportDelete(id: number) {
    this.confirmationService.confirm({
      message: '`คุณต้องการลบรายการนี้หรือไม่',
      header: "เลือก ตกลง เพื่อลบ หรือ ย้อนกลับ เพื่อกลับไปหน้าเดิม",
      acceptLabel: "ตกลง",
      rejectLabel: "ย้อนกลับ",
      accept: () => {
        this.report.deleteReport(id).pipe(
          take(1),
          tap(() => {
            console.log('..');  
          })
        )
          .subscribe({
            error: () => console.log('error'),
            complete: () => {
              console.log('complete')
              this.fetchData(this.itemId);
            }
          });
      }
    });
  }

  onPageChange(event: any) {
    this.loading = true;
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + 1;
    this.fetchData(this.itemId!, this.setParams());
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.data ? this.first === (this.data.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.data ? this.first === 0 : true;
  }
}
