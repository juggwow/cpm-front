import { Component, OnInit } from '@angular/core';
import { Boq } from 'src/app/models/boq.model';
import { TableModule, } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HttpParams } from '@angular/common/http';
import { SortEvent } from 'primeng/api';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { BoqService } from 'src/app/services/boq.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  providers: [BoqService],
  imports: [TableModule, InputTextModule, ButtonModule, RippleModule, RouterModule, PaginatorModule],
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  contractId: number | null = null;
  Boq: Boq[] = [];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  page: number = 1;
  loading: boolean = true;
  queryParams: any = {

  }

  private user_keyup_timeout: any

  constructor(
    private BoqService: BoqService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.contractId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchAllData(this.contractId)
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

  onPageChange(event: PageEvent,id: number | null = null) {
    this.loading = true;
    // this.contractId = Number(this.route.snapshot.paramMap.get('id'));
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page + 1;
    this.BoqService.getBoqByContractId(Number(id),this.page,this.rows)
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
