import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    { label: 'หน้าหลัก', icon: 'pi pi-fw pi-home', routerLink: [''] },
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['dashboard'] },
                    { label: 'จัดการงานก่อสร้าง', icon: 'pi pi-fw pi-table', routerLink: ['jobs'] },
                    {
                        label: 'ตรวจสอบมาตรฐาน',
                        icon: 'pi pi-fw pi-check-square',
                        items: [
                            {
                                label: 'ตรวจสอบมาตรฐาน',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'ตรวจนับพัสดุ',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            },
                            { label: 'เอกสาร', icon: 'pi pi-fw pi-home', routerLink: ['/doc'] },
                            { label: 'รายงานประจำวัน', icon: 'pi pi-fw pi-home', routerLink: ['/doc'] },

                        ]
                    },
                ],
            }
        ];
    }
}
