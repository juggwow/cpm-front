export interface ResponsePage<T> {
    data: T[];
    limit: number;
    page: number;
    total: number;
}

export interface PageOption {
    limit: number;
    page: number;
}

export interface JobPageOption {
    limit?: number;
    page?: number;
    committees?: string;
    jobName?: string;
    jobStatus?: string;
    supervisor?: string;
    wbs?: string;
}
