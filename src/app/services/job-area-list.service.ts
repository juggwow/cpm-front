import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageOption, ResponsePage } from 'src/app/models/response-page.model';
import {
    EditJobAreaBody,
    JobArea,
    JobAreaType,
} from '../models/job-area.model';
import { environment } from 'src/environments/environment';
import { CMDC_Job } from '../models/cmdc-job.model';

@Injectable()
export class JobAreaService {
    constructor(private http: HttpClient) {}

    getJobArea$(jobId: string, option: PageOption) {
        return this.http.get<ResponsePage<JobArea>>(
            `${environment.apiUrl}/jobs/${jobId}/areas`,
            { params: { ...option } }
        );
    }

    getJobAreaType$() {
        return this.http.get<JobAreaType[]>(
            `${environment.apiUrl}/job-areas-type`
        );
    }

    getCMDC_Job$(jobId: string) {
        return this.http.get<CMDC_Job>(`${environment.apiUrl}/jobs/${jobId}`);
    }

    createJobArea$(jobId: number, body: EditJobAreaBody) {
        return this.http.post<ResponsePage<JobArea>>(
            `${environment.apiUrl}/jobs/${jobId}/areas`,
            body
        );
    }

    editJobArea$(jobId: number, jobAreaId: number, body: EditJobAreaBody) {
        return this.http.put<ResponsePage<JobArea>>(
            `${environment.apiUrl}/jobs/${jobId}/areas/${jobAreaId}`,
            body
        );
    }

    deleteJobArea$(jobId: number, jobAreaId: number) {
        return this.http.delete<ResponsePage<JobArea>>(
            `${environment.apiUrl}/jobs/${jobId}/areas/${jobAreaId}`
        );
    }
}
