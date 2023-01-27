import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginCallbackService } from './services/login-callback.service';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadComponent: () =>
                                import(
                                    './pages/table/table.component'
                                ).then((m) => m.TableComponent),
                        },
                        {
                            path: 'form',
                            loadComponent: () =>
                                import(
                                    './pages/form/form.component'
                                ).then((m) => m.FormComponent),
                        },
                        {
                            path: 'report',
                            loadComponent: () =>
                                import(
                                    './pages/report/report.component'
                                ).then((m) => m.ReportComponent),
                        }
                    ],
                },
                { path: 'pages/notfound', component: NotfoundComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    providers: [LoginCallbackService],
    exports: [RouterModule],
})
export class AppRoutingModule {}
