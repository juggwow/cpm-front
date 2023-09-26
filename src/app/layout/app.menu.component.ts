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
                    { label: 'บริหาร/จัดการสัญญา', icon: 'pi pi-fw pi-home', routerLink: ['/contract/31'] },
                    { label: 'กรรมการตรวจรับ', icon: 'pi pi-fw pi-home', routerLink: ['/comm/31'] },
                    { label: 'กองโค', icon: 'pi pi-fw pi-home', routerLink: ['/pd/contract/31'] },
                    // { label: 'Form', icon: 'pi pi-fw pi-chart-bar', routerLink: ['form'] },
                    // {
                    //     label: 'Menus',
                    //     icon: 'pi pi-fw pi-check-square',
                    //     items: [
                    //         {
                    //             label: 'Login',
                    //             icon: 'pi pi-fw pi-sign-in',
                    //             routerLink: ['/auth/login']
                    //         },
                    //         {
                    //             label: 'Errors',
                    //             icon: 'pi pi-fw pi-times-circle',
                    //             routerLink: ['/auth/error']
                    //         },
                    //         {
                    //             label: 'Access Denied',
                    //             icon: 'pi pi-fw pi-lock',
                    //             routerLink: ['/auth/access']
                    //         },
                          

                    //     ]
                    // },
                ],
            }
        ];
    }
}
