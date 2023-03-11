export interface DocType {
    id: string;
    name: string;
}

export interface ListDocument {
    id: number
    seq: number
    invNo: string,
    qty: string,
    arrival: string,
    inspection: string,
    CreateBy: string,
    StateID: number,
    StateName: string
}
