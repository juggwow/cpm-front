export interface Form {
    itemID: number | null
    arrival: string | null
    inspection: string | null
    taskMaster: string | null
    invoice: string | null
    quantity: number | null
    country: string | null
    manufacturer: string | null
    model: string | null
    serial: string | null
    peano: string | null
    createby: string | null
    status: number | null
}

export interface Report {
    id: number;
    itemID: number;
    itemName: string;
    itemQty: string;
    itemUnit: string;
    arrival: string;
    inspection: string;
    taskMaster: string;
    invoice: string;
    quantity: number;
    country: string;
    manufacturer: string;
    model: string;
    serial: string;
    peano: string;
    stateName: string;
    status: number;
    filesAttach: file[];
}

export interface ReportView {
    id: number;
    itemID: number;
    itemName: string;
    itemUnit: string;
    arrival: string;
    inspection: string;
    taskMaster: string;
    invoice: string;
    quantity: number;
    country: string;
    brand: string;
    model: string;
    serial: string;
    peano: string;
    attachFiles: AttachFile[];
}

interface AttachFile {
    typeName: string;
    files: file[];
}

interface file {
    id: number;
    name: string;
    size: string;
    unit: string;
}