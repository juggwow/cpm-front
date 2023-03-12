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


export interface Document {
        id: number,
        itemID: number,
        itemName: string,
        itemQty: string,
        itemUnit: string,
        arrival: string,
        inspection: string,
        taskMaster: string,
        invoice: string,
        quantity: number,
        country: string,
        manufacturer: string,
        model: string,
        serial: string,
        peano: string,
        filesAttach : []
}


export interface FilesAttach {
    DocType:string,
    ID :string,
    Name:string,
    Path:string,
    RadID:string,
    Size:string,
    Unit:string,
}