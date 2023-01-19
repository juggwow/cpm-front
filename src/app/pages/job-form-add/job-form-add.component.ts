import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { FilterService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { CMDC_Job } from 'src/app/models/cmdc-job.model';
import { JobService } from '../../services/cmdc-job.service';
import {
    catchError,
    distinctUntilChanged,
    map,
    of,
    startWith,
    Subject,
    switchMap,
    take,
    takeUntil,
    tap,
} from 'rxjs';
import { AppToastService } from 'src/app/services/app-toast.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeType } from './job-form-add.model';

@Component({
    selector: 'app-add-form-job',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        InputNumberModule,
        ReactiveFormsModule,
    ],
    templateUrl: './job-form-add.component.html',
    styleUrls: ['./job-form-add.component.scss'],
    providers: [AppToastService, FilterService, JobService],
})
export class JobFormAddComponent implements OnInit, OnDestroy {
    results: Employee[] = [];

    jobFormGroup = new FormGroup({
        wbs: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required),
        documentEstDate: new FormControl(null, Validators.required),
        documentNo: new FormControl('', Validators.required),
        jobName: new FormControl('', Validators.required),
        latitude: new FormControl<string | null>(null, Validators.required),
        longtitude: new FormControl<string | null>(null, Validators.required),
        manageOffice: new FormControl('', Validators.required),
        planNo: new FormControl('', Validators.required),
        subDistrict: new FormControl('', Validators.required),
        supervisor: new FormGroup({
            employeeId: new FormControl('', Validators.required),
            firstName: new FormControl(),
            lastName: new FormControl(),
            position: new FormControl(),
            title: new FormControl(),
            fullName: new FormControl(),
        }),
        chairman: new FormGroup({
            employeeId: new FormControl('', Validators.required),
            firstName: new FormControl(),
            lastName: new FormControl(),
            position: new FormControl(),
            title: new FormControl(),
            fullName: new FormControl(),
        }),
        firstCommittee: new FormGroup({
            employeeId: new FormControl('', Validators.required),
            firstName: new FormControl(),
            lastName: new FormControl(),
            position: new FormControl(),
            title: new FormControl(),
            fullName: new FormControl(),
        }),
        secondCommittee: new FormGroup({
            employeeId: new FormControl('', Validators.required),
            firstName: new FormControl(),
            lastName: new FormControl(),
            position: new FormControl(),
            title: new FormControl(),
            fullName: new FormControl(),
        }),
    });

    searchEmployeeError = {
        supervisor: false,
        chairman: false,
        firstCommittee: false,
        secondCommittee: false,
    };

    submitDisabled$ = this.jobFormGroup.statusChanges.pipe(
        map((value) => value === 'INVALID'),
        startWith(true)
    );

    searchEmployeeSubject = new Subject<{
        employeeId: string;
        employeeType: EmployeeType;
    }>();

    destroySubject = new Subject();

    constructor(
        private appToastService: AppToastService,
        private location: Location,
        private jobsdataService: JobService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.searchEmployeeSubject
            .pipe(
                takeUntil(this.destroySubject),
                distinctUntilChanged(
                    (x, y) => JSON.stringify(x) === JSON.stringify(y)
                ),
                switchMap(({ employeeId, employeeType }) =>
                    this.jobsdataService.getEmployeeDetail$(employeeId).pipe(
                        tap((val) => {
                            this.jobFormGroup.patchValue({
                                [employeeType]: {
                                    ...val,
                                    fullName: `${val.title}${val.firstName} ${val.lastName}`,
                                },
                            });
                            this.searchEmployeeError[employeeType] = false;
                        }),
                        catchError(() => {
                            this.searchEmployeeError[employeeType] = true;
                            return of(undefined);
                        })
                    )
                )
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroySubject.next(undefined);
        this.destroySubject.complete();
    }

    get jobFormControl() {
        return this.jobFormGroup.controls;
    }

    onLocationBack() {
        this.location.back();
    }

    onSubmit() {
        const formValue = this.jobFormGroup.value as CMDC_Job;
        this.jobsdataService
            .addNewJob({
                ...formValue,
                supervisor: {
                    ...formValue.supervisor,
                    employeeId: formValue.supervisor.employeeId.toString(),
                },
                chairman: {
                    ...formValue.chairman,
                    employeeId: formValue.chairman.employeeId.toString(),
                },
                firstCommittee: {
                    ...formValue.firstCommittee,
                    employeeId: formValue.firstCommittee.employeeId.toString(),
                },
                secondCommittee: {
                    ...formValue.secondCommittee,
                    employeeId: formValue.secondCommittee.employeeId.toString(),
                },
                latitude: formValue.latitude.toString(),
                longtitude: formValue.longtitude.toString(),
            })
            .pipe(
                take(1),
                tap(() => {
                    this.appToastService.successToast();
                    this.router.navigate(['/']);
                })
            )
            .subscribe({
                error: () => this.appToastService.errorToast(),
            });
    }

    onEmployeeIdInput(inputValue: number | null, employeeType: EmployeeType) {
        if (!inputValue) {
            return;
        }

        const inputValueString = inputValue.toString();
        const employeeId =
            inputValueString.length === 7
                ? inputValueString.slice(0, -1)
                : inputValueString;

        if (employeeId.length < 6) {
            this.jobFormGroup.patchValue({
                [employeeType]: {
                    title: '',
                    firstName: '',
                    lastName: '',
                    position: '',
                    fullName: '',
                },
            });
            return;
        }

        this.searchEmployeeSubject.next({ employeeId, employeeType });
    }

    onClearEmployee(employeeType: EmployeeType) {
        this.jobFormGroup.patchValue({
            [employeeType]: {
                employeeId: '',
                title: '',
                firstName: '',
                lastName: '',
                position: '',
                fullName: '',
            },
        });
    }
}
