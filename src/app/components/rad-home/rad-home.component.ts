import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/models/project.model';
import { map } from 'rxjs/operators';

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

  constructor() { }

  ngOnInit(): void {
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

}
