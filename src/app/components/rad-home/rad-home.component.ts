import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/models/project.model';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-rad-home',
  templateUrl: './rad-home.component.html',
  styleUrls: ['./rad-home.component.scss']
})
export class RadHomeComponent implements OnInit {

  displayedColumns = ['id', 'itemNo', 'name', 'group', 'quantity', 'delivery', 'good', 'bad', 'action']

  dataSource = new MatTableDataSource<Project>();

  counter = 1;

  textIdSearch: string = '';

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  @ViewChild(MatSort, { static: true }) sort!: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.feedData()
  }

  feedData() {
    const dummy: Project[] = [
      {
        itemNo: 1.3,
        name: 'On-load tap-changing power transformer three-phase, 115-22 kV, 30/40/50 MVA (Dyn1)',
        group: 'POWER TRANFORMER',
        quantity: "10 Unit",
        delivery: "",
        good: "",
        bad: ""
      },
      {
        itemNo: 3.1,
        name: '115 kV circuit-breaker, SF6 gas, three-pole, 31.5 kA',
        group: '115 kV CIRCUIT BREAKER',
        quantity: "5 Unit",
        delivery: "",
        good: "2 Unit",
        bad: "2 Unit"
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 1.3,
        name: 'On-load tap-changing power transformer three-phase, 115-22 kV, 30/40/50 MVA (Dyn1)',
        group: 'POWER TRANFORMER',
        quantity: "10 Unit",
        delivery: "",
        good: "",
        bad: ""
      },
      {
        itemNo: 3.1,
        name: '115 kV circuit-breaker, SF6 gas, three-pole, 31.5 kA',
        group: '115 kV CIRCUIT BREAKER',
        quantity: "5 Unit",
        delivery: "",
        good: "2 Unit",
        bad: "2 Unit"
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 1.3,
        name: 'On-load tap-changing power transformer three-phase, 115-22 kV, 30/40/50 MVA (Dyn1)',
        group: 'POWER TRANFORMER',
        quantity: "10 Unit",
        delivery: "",
        good: "",
        bad: ""
      },
      {
        itemNo: 3.1,
        name: '115 kV circuit-breaker, SF6 gas, three-pole, 31.5 kA',
        group: '115 kV CIRCUIT BREAKER',
        quantity: "5 Unit",
        delivery: "",
        good: "2 Unit",
        bad: "2 Unit"
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      },
      {
        itemNo: 4.1,
        name: '115 kV disconnecting switch, three-pole, without grounding switch.',
        group: 'DISCONNECTING SWITCH',
        quantity: "2 Unit",
        delivery: "1 Unit",
        good: "",
        bad: ""
      }
    ]
    this.dataSource.data = dummy
  }

  search(event: Event | null) {
    let filterValue = ''
    if (event) {
      filterValue = (event.target as HTMLInputElement).value
    }
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  clearSearch() {
    this.textIdSearch = ''
    this.search(null)
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}
