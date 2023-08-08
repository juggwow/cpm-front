import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuItem, SortEvent } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { CardComponent } from 'src/app/components/card/card.component';
import { Boq } from 'src/app/models/boq.model';
import { PageEvent } from 'src/app/models/paginator.model';
import { BoqService } from 'src/app/services/boq.service';

@Component({
  providers: [BoqService],
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RouterModule,
    PaginatorModule,
    BreadcrumbModule,
    CardComponent
  ],
  selector: 'app-boq-item',
  standalone: true,
  templateUrl: './boq-item.component.html',
  styleUrls: ['./boq-item.component.scss']
})
export class BoqItemComponent implements OnInit {

  contractId: number | null = null;
  projectName: string = "...";
  Boq: Boq[] = [];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  page: number = 1;
  loading: boolean = true;
  queryParams: any = {};

  private user_keyup_timeout: any;

  items: MenuItem[] = [];
  home: MenuItem = {};

  allAmount: number = 0;
  allComplete: number = 0;
  allIncomplate: number = 0;
  checkAmount: number = 0;
  checkGood: number = 0;
  checkWaste: number = 0;
  progressAmount: number = 0;

  constructor(
    private BoqService: BoqService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.contractId = Number(this.route.snapshot.paramMap.get('id'));
    this.BoqService.getProjectDetail(this.contractId)
      .subscribe((res) => {
        this.projectName = res.name;
        this.items = [
          { label: 'บริหารจัดการสัญญา' },
          { label: 'บริหารสัญญา' },
          { label: this.projectName },
          { label: 'Receive and Damage' }
        ];
      });
    this.BoqService.getCardDetail(this.contractId)
      .subscribe((res) => {
        this.allAmount = res.all.Amount;
        this.allComplete = res.all.Complete;
        this.allIncomplate = res.all.Incomplete
        this.checkAmount = res.check.Amount;
        this.checkGood = res.check.Good;
        this.checkWaste = res.check.Waste;
        this.progressAmount = res.progress.Amount;
      });
    this.fetchAllData(this.contractId);

    // this.home = { icon: 'pi pi-home', routerLink: '/' };
  }



  onSortColumn(event: SortEvent) {
    let order = (event.order == 1) ? "asc" : "desc"
    this.queryParams["s" + event.field!] = order;
    this.fetchDataWhenSortOrFilter()
  }

  onFilterColumn(key: string, event: Event) {
    if (this.user_keyup_timeout) {
      clearTimeout(this.user_keyup_timeout);
    }

    let filterValue = (event.target as HTMLInputElement).value;

    if (filterValue == "") {
      delete this.queryParams[key]
    } else {
      this.queryParams[key] = filterValue;
    }

    this.user_keyup_timeout = setTimeout(() => {
      this.fetchDataWhenSortOrFilter()
    }, 1000);


  }

  fetchAllData(id: number) {
    this.loading = true;
    this.BoqService.getBoqByContractId(id)
      .subscribe((res) => {
        this.Boq = res.data;
        this.totalRecords = res.total;
        this.rows = res.limit;
        this.first = (res.page - 1) * this.rows;
        this.loading = false;
      });
  }


  fetchDataWhenSortOrFilter() {
    this.loading = true;
    const params = new HttpParams({ fromObject: this.queryParams })
    this.BoqService.getSortOrFilterBoq$(params)
      .subscribe((res) => {
        this.Boq = res.data;
        this.loading = false;
      })
  }



  onClearFilter(key: string) {
    console.log("clear", key)
  }

  onPageChange(event: PageEvent, id: number | null = null) {
    this.loading = true;
    // this.contractId = Number(this.route.snapshot.paramMap.get('id'));
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + 1;
    this.BoqService.getBoqByContractId(Number(id), this.page, this.rows)
      .subscribe((res) => {
        this.Boq = res.data;
        this.totalRecords = res.total;
        this.rows = res.limit;
        this.first = (res.page - 1) * this.rows;
        this.loading = false;
      });
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
    return this.Boq ? this.first === (this.Boq.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.Boq ? this.first === 0 : true;
  }
}

