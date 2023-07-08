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
                    path: 'contract/:id',
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
                            path: 'formupdate',
                            loadComponent: () =>
                                import(
                                    './pages/form_update/form_update.component'
                                ).then((m) => m.FormUpdateComponent),
                        },
                        {
                            path: 'forminprogress',
                            loadComponent: () =>
                                import(
                                    './pages/form_inprogress/form_inprogress.component'
                                ).then((m) => m.FormInprogressComponent),
                        },
                        {
                            path: 'item/:id/report',
                            loadComponent: () =>
                                import(
                                    './pages/report/report.component'
                                ).then((m) => m.ReportComponent),
                        },
                        {
                            path: 'progress',
                            loadComponent: () =>
                                import(
                                    './pages/progress/progress.component'
                                ).then((m) => m.ProgressComponent),
                        },
                        {
                            path: 'approve',
                            loadComponent: () =>
                                import(
                                    './pages/approve/approve.component'
                                ).then((m) => m.ApproveComponent),
                        }
                    ],
                },
                // { path: 'pages/notfound', component: NotfoundComponent },
                // { path: '**', redirectTo: 'pages/notfound' },
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
export class AppRoutingModule { }
