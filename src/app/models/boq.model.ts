export interface Boq {
    rowNo: number;
    id: number;
    number: string;
    name: string;
    groupName: string;
    quantity: string;
    deliveryQty: string;
    receiveQty: string;
    damageQty: string;
    receiveStatus: string;
}

export interface Project {
    contractID: number;
    workID: number;
    name: string;
    projectName: string;
    projectShortName: string;
    workName: string;
    workType: string;
}

export interface CardDetail {
    all: All;
    check: Check;
    progress: { Amount: number; }
}

interface All {
    Amount: number;
    Complete: number;
    Incomplete: number;
}
interface Check {
    Amount: number;
    Good: number;
    Waste: number;
}