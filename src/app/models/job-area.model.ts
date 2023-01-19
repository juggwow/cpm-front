export interface JobArea {
    areaSeq: number;
    deploymentAction: number;
    detail: string;
    id: number;
    indicator: Indicator;
    jobAreaTypeId: number;
    jobAreaType: JobAreaType;
    status: number;
}

export interface Indicator {
    groundHt: boolean;
    groundHtValue: number;
    groundIt: boolean;
    groundItValue: number;
    id: number;
    poleFoundation: boolean;
    type: string;
}

export interface JobAreaType {
    id: number;
    jobAreaType:
        | 'SP'
        | 'SPAL'
        | 'TR'
        | 'UE'
        | 'BA'
        | 'CCB'
        | 'CSC'
        | 'CTB'
        | 'DDE'
        | 'DE'
        | 'LTP';
    detailEng?: string;
    detailTh?: string;
}

export interface EditJobAreaBody {
    areaSeq: number;
    detail: string;
    jobAreaTypeID: number;
}
