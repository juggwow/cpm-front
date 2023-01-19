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
                            canActivate: [LoginCallbackService],
                            loadComponent: () =>
                                import(
                                    './pages/job-list/job-list.component'
                                ).then((m) => m.JobListComponent),
                        },
                        {
                            path: 'jobs/daily/:id',
                            loadComponent: () =>
                                import(
                                    './pages/job-area-daily-detail/job-area-daily-detail.component'
                                ).then((m) => m.JobAreaDailyDetailComponent),
                        },
                        {
                            path: 'jobs/:id',
                            loadComponent: () =>
                                import(
                                    './pages/job-area-list/job-area-list.component'
                                ).then((m) => m.JobAreaComponent),
                        },
                        {
                            path: 'parcels',
                            loadComponent: () =>
                                import(
                                    './pages/parcels-check/parcels-check.component'
                                ).then((m) => m.ParcelsCheckComponent),
                        },
                        {
                            path: 'picture',
                            loadComponent: () =>
                                import(
                                    './pages/picture-of-work/picture-of-work.component'
                                ).then((m) => m.PictureOfWorkComponent),
                        },
                        {
                            path: 'mapview',
                            loadComponent: () =>
                                import(
                                    './pages/mapview/mapview.component'
                                ).then((m) => m.MapviewComponent),
                        },
                        {
                            path: 'jobs',
                            loadComponent: () =>
                                import(
                                    './pages/job-list/job-list.component'
                                ).then((m) => m.JobListComponent),
                        },
                        {
                            path: 'job-add',
                            loadComponent: () =>
                                import(
                                    './pages/job-form-add/job-form-add.component'
                                ).then((m) => m.JobFormAddComponent),
                        },
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
