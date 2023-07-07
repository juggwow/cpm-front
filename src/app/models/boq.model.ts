import { LookupAllOptions } from "dns";

export interface Boq {
    sequencesNo: number;
    boqID: number;
    itemNo: string;
    name: number;
    group: string;
    quantity: number;
    delivery: string;
    good: number;
    bad: number;
}

export interface Project {
    contractID: number;
    workID: number;
    name: string;
}

export interface CardDetail{
    all:All;
    check:Check;
    progress:{Amount:number;}
}

interface All {
    Amount:number;
    Complete:number;
    Incomplete:number;
}
interface Check{
    Amount:number;
    Good:number;
    Waste:number;
}