import { Component, OnInit } from '@angular/core';
import { BoqService } from 'src/app/services/rad-boq';
import { Boq } from 'src/app/models/boq.model';
import { take } from 'rxjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {TableModule,} from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@Component({
  providers: [BoqService],
  imports:[TableModule,InputTextModule,ButtonModule,RippleModule],
  selector: 'app-table',
  standalone:true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  Boq: Boq[] = [];
  first = 0
  rows = 10
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



  

  onFilterWbs(value: string) {
    console.log("..")
  }

  onFilterJobName(value: string) {
    console.log("..")
  }

  onFilterJobStatus(jobStatus: string | null) {
    console.log("..")
  }

  onFilterSupervisor(value: string) {
    console.log("..")
  }

  onFilterCommittees(value: string) {
    console.log("..")
  }

  onClearWbs() {
    console.log("..")
  }

  onClearJobName() {
    console.log("..")
  }

  onClearSupervisor() {
    console.log("..")
  }

  onClearCommittes() {
    console.log("..")
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
