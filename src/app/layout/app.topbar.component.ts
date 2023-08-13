import { Component, ElementRef, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { UserService } from '../services/user.service';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [UserService],
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    userInfo$!: Observable<Employee>;
    userInfo: Employee | null = null;

    constructor(
        public layoutService: LayoutService,
        private userService: UserService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.userService
            .getCurrentUser$()
            .pipe(take(1))
            .subscribe((res) => {
                // console.log(res);
                this.userInfo = res;
            });
    }

    logout() {
        const token = window.sessionStorage.getItem('token');
        window.sessionStorage.clear();
        const dataUrl = this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(
                `${environment.authApiUrl}/logout/${encodeURIComponent(token!)}`
            )
        );
        window.location.replace(dataUrl!);
    }
}
