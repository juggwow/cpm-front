export interface ResponsePage<T> {
    item: Item;
    data: T[];
    doc: T[];
    limit: number;
    page: number;
    total: number;
}

export interface Item {
    id: number;
    name: string;
    contractQTY: string;
    receiveQTY: string;
    quantity:number;
    unit:string;

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
