export interface ReportProgress {
    id: number;
    seq: number;
    invNo: string;
    itemID : number;
    itemName: string;
    arrival: string;
    inspection: string;
    stateID: number;
    stateName: string;
}

export interface ReportApprove {
    id: number;
    seq: number;
    invNo: string;
    itemName: string;
    arrival: string;
    inspection: string;
    amount: string;
    good: string;
    waste: string;
}

export interface ReportItem {
    id: number
    seq: number
    invNo: string,
    qty: string,
    arrival: string,
    inspection: string,
    createBy: string,
    stateID: number,
    stateName: string
}