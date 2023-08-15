import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-test-dropdown',
  standalone: true,
  templateUrl: './test-dropdown.component.html',
  styleUrls: ['./test-dropdown.component.scss'],
  imports: [DropdownModule]
})
export class TestDropdownComponent implements OnInit {
  cities!: City[];

  selectedCity!: City;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

}
