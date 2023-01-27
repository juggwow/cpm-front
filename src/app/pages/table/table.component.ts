import { Component, OnInit } from '@angular/core';
import { BoqService } from 'src/app/services/rad-boq';
import { Boq } from 'src/app/models/boq.model';
import { take } from 'rxjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {TableModule,} from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HttpParams } from '@angular/common/http';
import { SortEvent } from 'primeng/api';
import { RouterModule } from '@angular/router';
@Component({
  providers: [BoqService],
  imports:[TableModule,InputTextModule,ButtonModule,RippleModule,RouterModule],
  selector: 'app-table',
  standalone:true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  Boq: Boq[] = [];
  first = 0
  rows = 10
  loading: boolean = true;
  queryParams:any = {

  }


  constructor(
    private BoqService: BoqService
    ) {}

  ngOnInit(): void {
    this.fetchAllData()
  }



  onSortColumn(event:SortEvent){
      let order = (event.order == 1) ? "asc" : "desc"
      this.queryParams["s"+event.field!] = order;
      this.fetchDataWhenSortOrFilter()
  }

  onFilterColumn(key:string,event:Event){
    let filterValue = (event.target as HTMLInputElement).value;

    if (filterValue == ""){
      delete this.queryParams[key]
    }else{
      this.queryParams[key] = filterValue;
    }

    this.fetchDataWhenSortOrFilter()
  }


  

  fetchAllData(){
    this.loading = true;
    this.BoqService
    .getAllBoq$().pipe(take(1))
    .subscribe((res) => {
        this.Boq = res.data;
        console.log(this.Boq)
        this.loading = false;
    });
  }

  
  fetchDataWhenSortOrFilter(){
    this.loading = true;
    const params = new HttpParams({fromObject: this.queryParams})
    this.BoqService.getSortOrFilterBoq$(params)
    .subscribe((res) =>{
      this.Boq = res.data;
      this.loading = false;
    })
  }


  
  onClearFilter(key:string) {
    console.log("clear",key)
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
        return this.Boq ? this.first === (this.Boq.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.Boq ? this.first === 0 : true;
    }
}
