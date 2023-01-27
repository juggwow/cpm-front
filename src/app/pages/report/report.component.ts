import { Component } from '@angular/core';
import { Boq } from 'src/app/models/boq.model';
import { BoqService } from 'src/app/services/rad-boq';
import { SortEvent } from 'primeng/api';
import { take } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {TableModule,} from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
@Component({
  selector: 'app-report',
  standalone:true,
  providers: [BoqService],
  imports:[TableModule,InputTextModule,ButtonModule,RippleModule,RouterModule,BadgeModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {




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





}
