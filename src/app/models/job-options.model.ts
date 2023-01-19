
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
