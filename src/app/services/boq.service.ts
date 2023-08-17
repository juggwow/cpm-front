import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ResponsePage } from 'src/app/models/response-page.model';
import { environment } from 'src/environments/environment';
import { CardDetail, Boq, Project } from '../models/boq.model';


@Injectable()
export class BoqService {

    constructor(private http: HttpClient) { }

    // getBoqByContractId(id: number, page: number = 1, limit: number = 10): Observable<ResponsePage<Boq>> {
    //     // return this.http.get<ResponsePage<Boq>>(`${environment.apiUrl}/contract/${id}/boq?page=${page}&limit=${limit}`);
    //     return this.http.get<ResponsePage<Boq>>(`${environment.apiUrl}/boq-item/${id}?page=${page}&limit=${limit}`);
    // }


    // getSortOrFilterBoq$(id: number, param: HttpParams) {
    //     // return this.http.get<ResponsePage<Boq>>(`${environment.apiUrl}/contract/31/boq`, { params: param });
    //     return this.http.get<ResponsePage<Boq>>(`${environment.apiUrl}/boq-item/${id}`, { params: param });
    // }

    getBoqByContractId<T>(id: number, params?: HttpParams): Observable<T> {
        const options = { params: params };
        return this.http.get<T>(`${environment.apiUrl}/boq-item/${id}`, options);
    }

    getProjectDetail(id: number): Observable<Project> {
        return this.http.get<Project>(`${environment.apiUrl}/contract/${id}`);
    }

    getCardDetail(id: number): Observable<CardDetail> {
        return this.http.get<CardDetail>(`${environment.apiUrl}/contract/${id}/card`)
    }

    getBoqItemDetail(itemId: number): Observable<Item> {
        return this.http.get<Item>(`${environment.apiUrl}/boq/${itemId}`);
    }


}
