import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, SortEvent } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { CardComponent } from 'src/app/components/card/card.component';
import { PageEvent } from 'src/app/models/paginator.model';
import { ReportProgress } from 'src/app/models/report.model';
import { ResponsePage } from 'src/app/models/response-page.model';
import { BoqService } from 'src/app/services/boq.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  imports: [
    BreadcrumbModule,
    CardComponent,
    TableModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    PaginatorModule
  ],
  providers: [BoqService, ReportService]
})
export class ProgressComponent implements OnInit {

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

  data!: ReportProgress[];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  page: number = 1;

  sort: HttpParams = new HttpParams();
  search: HttpParams = new HttpParams();

  private user_keyup_timeout: any;

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

  onSortColumn(event: SortEvent, id: number) {
    let order = (event.order == 1) ? "asc" : "desc";
    this.sort = this.sort.set(event.field!, order);
    this.fetchData(id, this.setParams());
  }

  onPageChange(event: PageEvent, id: number) {
    this.loading = true;
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + 1;
    this.fetchData(id, this.setParams());
  }

  fetchData(id: number, params?: HttpParams) {
    this.loading = true;
    this.report.getProgressByContractId<ResponsePage<ReportProgress>>(id, params)
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
      params = params.set(key, this.sort.get(key)!)
    }
    return params;
  }

}
