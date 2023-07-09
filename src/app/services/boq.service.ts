import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ResponsePage } from 'src/app/models/response-page.model';
import { CardDetail, Boq, Project } from '../models/boq.model';


@Injectable()
export class BoqService {

    readonly url = 'https://cpm-rad-api-ing-dev.pea.co.th/api/v1';

    constructor(private http: HttpClient) { }

    getBoqByContractId(id: number,page:number = 1,limit:number=10) :Observable<ResponsePage<Boq>>{
        return this.http.get<ResponsePage<Boq>>(`${this.url}/contract/${id}/boq?page=${page}&limit=${limit}`);
    }


    getSortOrFilterBoq$(param: HttpParams) {
        return this.http.get<ResponsePage<Boq>>(
            `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/contract/31/boq`, { params: param }
        );
    }

    getProjectDetail(id:number):Observable<Project>{
        return this.http.get<Project>(`${this.url}/contract/${id}`);
    }

    getCardDetail(id:number):Observable<CardDetail>{
        return this.http.get<CardDetail>(`${this.url}/contract/${id}/card`)
    }

    getBoqItemDetail(itemId:number) : Observable<Item>{
        return this.http.get<Item>(`${this.url}/boq/${itemId}`);
    }


}
