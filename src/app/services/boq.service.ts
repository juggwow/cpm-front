import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePage } from 'src/app/models/response-page.model';
import { Boq } from '../models/boq.model';


@Injectable()
export class BoqService {

    readonly url = 'https://cpm-rad-api-ing-dev.pea.co.th/api/v1/contract';

    constructor(private http: HttpClient) { }

    getBoqByContractId(id: number) :Observable<ResponsePage<Boq>>{
        return this.http.get<ResponsePage<Boq>>(`${this.url}/${id}/boq`);
    }


    getSortOrFilterBoq$(param: HttpParams) {
        return this.http.get<ResponsePage<Boq>>(
            `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/contract/31/boq`, { params: param }
        );
    }


}
