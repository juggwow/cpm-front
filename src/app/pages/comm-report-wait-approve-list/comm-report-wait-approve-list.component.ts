import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';
import { ConfirmationService, MenuItem, SortEvent, PrimeIcons } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { take, tap } from 'rxjs';
import { CardComponent } from 'src/app/components/card/card.component';
import { Report } from 'src/app/models/form.model';
import { ResponsePage } from 'src/app/models/response-page.model';
import { BoqService } from 'src/app/services/boq.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-comm-report-wait-approve-list',
  templateUrl: './comm-report-wait-approve-list.component.html',
  styleUrls: ['./comm-report-wait-approve-list.component.scss'],
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  providers: [ReportService, ConfirmationService],
  imports: [
    BreadcrumbModule,
    CardComponent,
    TableModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    PaginatorModule,
    MenuModule,
    ToastModule,
    ContextMenuModule,
    CommonModule,
    ConfirmDialogModule,
    PdfViewerModule,
    DialogModule,
    RouterModule,
    MatIconModule
  ]
})
export class CommReportWaitApproveListComponent implements OnInit{
  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;

  src: string = "";
  display: boolean = false;

  contractId!: number;
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

  data!: Report[];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  page: number = 1;

  sort: HttpParams = new HttpParams();
  search: HttpParams = new HttpParams();

  private user_keyup_timeout: any;

  reportManageMenu: MenuItem[] = [];
  // activeItem!: ReportProgress;

  constructor(
    private boqService: BoqService,
    private route: ActivatedRoute,
    private report: ReportService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.contractId = Number(this.route.snapshot.parent?.paramMap.get('id'));
    this.boqService.getProjectDetail(this.contractId)
      .subscribe((res) => {
        this.projectName = res.workName;
        this.items = [
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
    this.fetchData(this.contractId);
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
    this.fetchData(this.contractId!, this.setParams());
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
      this.fetchData(this.contractId!,this.setParams());
    }, 3000);
  }

  onClearFilter(key: string) {
    this.search = this.search.delete(key);
    this.fetchData(this.contractId!, this.setParams());
  }


  setReportDrafMenu(report: Report) {
    this.reportManageMenu = [
      {
        label: 'แก้ไข',
        icon: PrimeIcons.PENCIL,
        routerLink: `../item/${report.itemID}/report/${report.id}/edit`
        // routerLink: ['/file',id]
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
          //console.log(report.id)
          this.ReportDelete(report.id);
        }
      }
    ];
  }
  setReportSubmitMenu(report: Report) {
    this.reportManageMenu = [
      {
        label: 'ดูรายละเอียด',
        icon: PrimeIcons.SEARCH,
        routerLink: `../item/${report.itemID}/report/${report.id}/view`
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
            // this.show(status);        
            // // this.appToastService.successToast();
            // this.router.navigate(['/']);     
          })
        )
          .subscribe({
            error: () => console.log('error'),
            complete: () => {
              console.log('complete')
              this.fetchData(this.contractId);
              //   setTimeout(() => {
              //     this.router.navigate(['/contract',this.contractId,'report','item',this.itemId]);
              //  }, 1000);
            }
          });
      }
    });
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

  onPageChange(event: any) {
    this.loading = true;
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + 1;
    this.fetchData(this.contractId!, this.setParams());
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

  fetchData(id: number, params?: HttpParams) {
    this.loading = true;
    this.report.getWaitForApprovReportByContractId<ResponsePage<Report>>(id, params)
      .subscribe((res) => {
        this.data = res.data;
        this.totalRecords = res.total;
        this.rows = res.limit;
        this.first = (res.page - 1) * this.rows;
        this.page = res.page;
        this.loading = false;

      });
  }
}
