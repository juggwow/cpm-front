import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MenuItem, SortEvent } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CardComponent } from 'src/app/components/card/card.component';
import { Boq } from 'src/app/models/boq.model';
import { ResponsePage } from 'src/app/models/response-page.model';
import { BoqService } from 'src/app/services/boq.service';

@Component({
  selector: 'app-comm-item-list',
  standalone: true,
  templateUrl: './comm-item-list.component.html',
  styleUrls: ['./comm-item-list.component.scss'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
  providers: [BoqService],
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RouterModule,
    PaginatorModule,
    BreadcrumbModule,
    CardComponent,
    TagModule,
    CommonModule
  ],
})
export class CommItemListComponent implements OnInit{
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

  sort: HttpParams = new HttpParams();
  search: HttpParams = new HttpParams();


  constructor(
    private BoqService: BoqService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.contractId = Number(this.route.snapshot.paramMap.get('id'));
    this.BoqService.getProjectDetail(this.contractId)
      .subscribe((res) => {
        this.projectName = res.workName;
        this.items = [
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
    this.fetchData(this.contractId);

    // this.home = { icon: 'pi pi-home', routerLink: '/' };
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
      // delete this.queryParams[key]
      this.search = this.search.delete(key);
    } else {
      // this.queryParams[key] = filterValue;
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

  fetchData(id: number, params?: HttpParams) {
    this.loading = true;
    this.BoqService.getBoqByContractId<ResponsePage<Boq>>(id, params)
      .subscribe((res) => {
        this.Boq = res.data;
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
