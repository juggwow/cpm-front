import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/cmdc-job.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobPageOption } from 'src/app/models/response-page.model';
import { PaginatorModule } from 'primeng/paginator';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    scan,
    shareReplay,
    switchMap,
    tap,
} from 'rxjs/operators';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-job-list',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        FormsModule,
        PaginatorModule,
        AutoCompleteModule,
    ],
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss'],
    providers: [MessageService, ConfirmationService, JobService],
})
export class JobListComponent {
    jobStatusList = [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Failed', value: 'FAILED' },
    ];

    wbsSubject = new BehaviorSubject('');

    jobNameSubject = new BehaviorSubject('');

    supervisorSubject = new BehaviorSubject('');

    committeesSubject = new BehaviorSubject('');

    jobPageOptionSubject = new BehaviorSubject<JobPageOption>({
        jobName: '',
        limit: 10,
        wbs: '',
        supervisor: '',
        committees: '',
    });

    jobPageOption$ = this.jobPageOptionSubject.pipe(
        scan((acc, cur) => ({ ...acc, ...cur }))
    );

    debounceWbs$ = this.debounceText$(this.wbsSubject).pipe(
        tap((wbs) => this.jobPageOptionSubject.next({ wbs }))
    );

    debounceJobName$ = this.debounceText$(this.jobNameSubject).pipe(
        tap((jobName) => this.jobPageOptionSubject.next({ jobName }))
    );

    debounceSupervisor$ = this.debounceText$(this.supervisorSubject).pipe(
        tap((supervisor) => this.jobPageOptionSubject.next({ supervisor }))
    );

    debounceCommittees$ = this.debounceText$(this.committeesSubject).pipe(
        tap((committees) => this.jobPageOptionSubject.next({ committees }))
    );

    jobsList$ = this.jobPageOption$.pipe(
        distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y)),
        map((option) => this.cloneRemoveEmptyFieldObject(option)),
        switchMap((option) => this.jobService.getJobData$(option)),
        shareReplay()
    );

    constructor(private jobService: JobService, private router: Router) {}

    // [Todo]: Find better `obj` type later
    cloneRemoveEmptyFieldObject(obj: any) {
        return Object.keys(obj).reduce(
            (acc, cur) => (obj[cur] ? { ...acc, [cur]: obj[cur] } : acc),
            {}
        );
    }

    routesToJobAreaList(id: number) {
        this.router.navigate([`/jobs/${id}`]);
    }

    debounceText$(subject: Subject<string>) {
        return subject.pipe(distinctUntilChanged(), debounceTime(500));
    }

    paginate(event: {
        page: number;
        first: number;
        rows: number;
        pageCount: number;
    }) {
        const page = event.first / event.rows + 1;
        this.jobPageOptionSubject.next({ page, limit: event.rows });
    }

    onFilterWbs(value: string) {
        this.wbsSubject.next(value);
    }

    onFilterJobName(value: string) {
        this.jobNameSubject.next(value);
    }

    onFilterJobStatus(jobStatus: string | null) {
        this.jobPageOptionSubject.next({ jobStatus: jobStatus || '' });
    }

    onFilterSupervisor(value: string) {
        this.supervisorSubject.next(value);
    }

    onFilterCommittees(value: string) {
        this.committeesSubject.next(value);
    }

    onClearWbs() {
        this.jobPageOptionSubject.next({ wbs: '' });
        this.wbsSubject.next('');
    }

    onClearJobName() {
        this.jobPageOptionSubject.next({ jobName: '' });
        this.jobNameSubject.next('');
    }

    onClearSupervisor() {
        this.jobPageOptionSubject.next({ supervisor: '' });
        this.supervisorSubject.next('');
    }

    onClearCommittes() {
        this.jobPageOptionSubject.next({ committees: '' });
        this.committeesSubject.next('');
    }
}
