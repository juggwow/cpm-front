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
                    canActivate: [LoginCallbackService],
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadComponent: () =>
                                import(
                                    './pages/boq-item/boq-item.component'
                                ).then((m) => m.BoqItemComponent),
                        },
                        {
                            path: 'item/:id/report/create',
                            loadComponent: () =>
                                import(
                                    './pages/form/form.component'
                                ).then((m) => m.FormComponent),
                        },
                        {
                            path: 'item/:itemID/report/:reportID/edit',
                            loadComponent: () =>
                                import(
                                    './pages/form-edit/form-edit.component'
                                ).then((m) => m.FormEditComponent),
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
                        },
                        {
                            path: 'item/:itemID/report/:reportID/view',
                            loadComponent: () =>
                                import(
                                    './pages/report-view/report-view.component'
                                ).then((m) => m.ReportViewComponent),
                        }
                    ],
                },
                {
                    path: 'pd/contract/:id',
                    canActivate: [LoginCallbackService],
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadComponent: () =>
                                import(
                                    './pages/pd-item-list/pd-item-list.component'
                                ).then((m) => m.PdItemListComponent),
                        },
                        {
                            path: ':itemID/report',
                            loadComponent: () =>
                                import(
                                    './pages/pd-item-report-list/pd-item-report-list.component'
                                ).then((m) => m.PdItemReportListComponent),
                        },
                        {
                            path: 'approve',
                            loadComponent: () =>
                                import(
                                    './pages/pd-report-approve-list/pd-report-approve-list.component'
                                ).then((m) => m.PdReportApproveListComponent),
                        },
                        {
                            path: 'progress',
                            loadComponent: () =>
                                import(
                                    './pages/pd-report-wait-approve-list/pd-report-wait-approve-list.component'
                                ).then((m) => m.PdReportWaitApproveListComponent),
                        },
                        {
                            path: ':itemID/:reportID',
                            loadComponent: () =>
                                import(
                                    './pages/pd-report-detail/pd-report-detail.component'
                                ).then((m) => m.PdReportDetailComponent),
                        },
                    ]
                },
                {
                    path: 'comm/:id',
                    canActivate: [LoginCallbackService],
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadComponent: () =>
                                import(
                                    './pages/comm-item-list/comm-item-list.component'
                                ).then((m) => m.CommItemListComponent),
                        },
                        {
                            path: 'approve',
                            loadComponent: () =>
                                import(
                                    './pages/comm-report-approve-list/comm-report-approve-list.component'
                                ).then((m) => m.CommReportApproveListComponent),
                        },
                    ]
                },
                {
                    path: 'file/:id',
                    canActivate: [LoginCallbackService],
                    loadComponent: () =>
                        import(
                            './pages/report-pdf/report-pdf.component'
                        ).then((m) => m.ReportPdfComponent),
                },
                { path: 'pages/notfound', component: NotfoundComponent },
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
