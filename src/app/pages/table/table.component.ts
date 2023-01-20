import { Component, OnInit } from '@angular/core';
import { BoqService } from 'src/app/services/rad-boq';
import { Boq } from 'src/app/models/boq.model';
import { take } from 'rxjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@Component({
  providers: [BoqService],
  imports:[Ng2SmartTableModule],
  selector: 'app-table',
  standalone:true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {


  Boq: Boq[] = [];


  settings = {
    actions:{
      add : false,
      edit : false,
      delete: false,
    },
    columns: {
      sequencesNo: {
        title: 'ลำดับ',
      },
      itemNo: {
        title: 'Item No.',
      },
      name: {
        title: 'รายการ',
      },
      group: {
        title: 'รายการหลัก',
      },
      quantity: {
        title: 'จำนวนตามสัญญา',
      },
      delivery: {
        title: 'จำนวนที่รอส่งมอบ',
      },
      good: {
        title: 'สภาพดี',
      },
      bad: {
        title: 'พบปัญหา',
      },
    },
  };



  
  constructor(
    private BoqService: BoqService
    ) {}

  ngOnInit(): void {
    this.BoqService
    .getAllBoq$().pipe(take(1))
    .subscribe((res) => {
        this.Boq = res.data;
        console.log(this.Boq)
    });
    
  }




  onDeleteConfirm() {
    console.log("Delete Event In Console")
    console.log(event);
  }

  onCreateConfirm() {
    console.log("Create Event In Console")

  }

  onSaveConfirm() {
    console.log("Edit Event In Console")
  }

  
}
