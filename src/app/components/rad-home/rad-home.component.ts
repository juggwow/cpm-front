import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-rad-home',
  templateUrl: './rad-home.component.html',
  styleUrls: ['./rad-home.component.scss']
})
export class RadHomeComponent implements OnInit {

  displayedColumns = ['order', 'ItemNo', 'listName', 'mainListName', 'quantityContact', 'quantitiySent', 'quantityOk', 'quantityNg', 'action']

  dataSource = new MatTableDataSource<Project>();

  constructor() { }

  ngOnInit(): void {
    this.feedData()
  }

  feedData() {
    const dummy: Project[] = [
      {
        itemNo: 1.3,
        listName: 'On-load tap-changing power transformer three-phase, 115-22 kV, 30/40/50 MVA (Dyn1)',
        mainListName: 'POWER TRANFORMER',
        quantityContact: 10,
        quantitiySent: 0,
        quantityOk: 0,
        quantityNg: 0
      },
      {
        itemNo: 3.1,
        listName: '115 kV circuit-breaker, SF6 gas, three-pole, 31.5 kA',
        mainListName: '115 kV CIRCUIT BREAKER',
        quantityContact: 5,
        quantitiySent: 0,
        quantityOk: 2,
        quantityNg: 2
      },
      {
        itemNo: 4.1,
        listName: '115 kV disconnecting switch, three-pole, without grounding switch.',
        mainListName: 'DISCONNECTING SWITCH',
        quantityContact: 2,
        quantitiySent: 1,
        quantityOk: 0,
        quantityNg: 0
      }
    ]
    this.dataSource.data = dummy
  }

}
