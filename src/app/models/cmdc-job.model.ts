import { Employee } from './employee.model';
export interface JobList {
    id: number;
    sapStatus: string;
    wbs: string;
    jobName: string;
    woker: string;
    checker: string;
    jobStatus: string;
}
export interface EmployeeWithRole {
    employeeId: number;
    roleId: string;
}
export interface CMDC_Job {
    id?: number;
    cpmJobId?: number;
    jobName: string;
    wbs: string;
    planNo: string;
    description?: string;
    manageOffice: string;
    latitude: string;
    longtitude: string;
    subDistrict: string;
    district: string;
    documentNo: string;
    documentEstDate: Date | null;
    jobStatus?: string;
    sapStatus?: string;
    factorId?: number;
    factorValue?: number;
    extraCost?: number;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    deleteFlag?: Boolean;
    supervisor: Employee;
    chairman: Employee;
    firstCommittee: Employee;
    secondCommittee: Employee;
}
