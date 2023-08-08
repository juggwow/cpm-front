import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Report, ReportView } from 'src/app/models/form.model';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    CommonModule,
    MenuModule]
  ,
  providers: [FormService]
})
export class ReportViewComponent implements OnInit {

  reportId: number | null = null;
  manageMenu: MenuItem[] = [];

  report: ReportView = {
    id: 0,
    itemID: 0,
    itemName: '',
    itemUnit: '',
    arrival: '',
    inspection: '',
    taskMaster: '',
    invoice: '',
    quantity: 0,
    country: '',
    brand: '',
    model: '',
    serial: '',
    peano: '',
    attachFiles: []
  };

  constructor(
    private route: ActivatedRoute,
    private form: FormService
  ) { }

  ngOnInit(): void {
    this.reportId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.reportId) {
      this.form.reportView<ReportView>(this.reportId)
        .subscribe((res) => { this.report = { ...this.report, ...res } });
    }
  }

  ShowMenuManage(id: number){
    this.manageMenu = [
      {
        label: 'Download เอกสาร',
        icon: PrimeIcons.DOWNLOAD,
        url: `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/download/${id}`
        // routerLink: `['']`
      },
      {
        label: 'Preview เอกสาร',
        icon: PrimeIcons.EYE,
        command: () => {
          console.log("report.id")
        }
      }
    ];
  }

}
