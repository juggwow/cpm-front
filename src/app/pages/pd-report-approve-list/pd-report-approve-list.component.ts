import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { MenuItem, SortEvent } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import * as printJS from 'print-js';
import { CardComponent } from 'src/app/components/card/card.component';
import { ReportApprove } from 'src/app/models/report.model';
import { ResponsePage } from 'src/app/models/response-page.model';
import { BoqService } from 'src/app/services/boq.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-pd-report-approve-list',
  templateUrl: './pd-report-approve-list.component.html',
  styleUrls: ['./pd-report-approve-list.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [BoqService, ReportService],
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
    PdfViewerModule,
    DialogModule,
    BlockUIModule,
    ProgressSpinnerModule
  ]
})
export class PdReportApproveListComponent {
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

  data!: ReportApprove[];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  page: number = 1;

  sort: HttpParams = new HttpParams();
  search: HttpParams = new HttpParams();

  private user_keyup_timeout: any;

  selectedReports!: ReportApprove[] | null;
  blockedDocument: boolean = false;

  constructor(
    private boqService: BoqService,
    private route: ActivatedRoute,
    private report: ReportService
  ) { }

  ngOnInit(): void {
    this.contractId = Number(this.route.snapshot.parent?.paramMap.get('id'));
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
    this.fetchData(this.contractId);
  }

  fetchData(id: number, params?: HttpParams) {
    this.loading = true;
    this.report.getApproveByContractId<ResponsePage<ReportApprove>>(id, params)
      .subscribe((res) => {
        this.data = res.data;
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

  onPageChange(event: any) {
    this.loading = true;
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + 1;
    this.fetchData(this.contractId!, this.setParams());
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
      this.fetchData(this.contractId!, this.setParams());
    }, 3000);
  }

  onClearFilter(key: string) {
    this.search = this.search.delete(key);
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

  reportPreview(id: number) {
    this.display = true;
    this.report.getPdfReport<Blob>(id).subscribe((response) => {
      this.src = URL.createObjectURL(response);
    })
  }

  onHide() {
    this.pdfComponent.clear();
  }

  printSelectedReports() {
    this.blockedDocument = true;
    let id = this.selectedReports![0].id
    console.log(id)
    this.selectedReports = null;
    this.report.getPdfReport<Blob>(id).subscribe((response) => {
      this.src = URL.createObjectURL(response);
      printJS({ printable: this.src, type: 'pdf', showModal: true })
      this.blockedDocument = false;
    })
  }
}
