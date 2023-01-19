import { Employee } from '../models/employee.model';
import { JobList, CMDC_Job } from '../models/cmdc-job.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsePage, JobPageOption } from '../models/response-page.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class JobService {
    auth_token = '';

    constructor(private http: HttpClient) {}

    getJobData$(option: JobPageOption) {
        return this.http.get<ResponsePage<JobList>>(
            `${environment.apiUrl}/jobs`,
            {
                params: { ...option },
            }
        );
    }

    getEmployeeDetail$(employeeId: string) {
        return this.http.get<Employee>(
            `${environment.apiUrl}/employees/${employeeId}`
        );
    }

    addNewJob(cmdcJob: CMDC_Job) {
        return this.http.post<CMDC_Job>(`${environment.apiUrl}/jobs`, cmdcJob);
    }
}
