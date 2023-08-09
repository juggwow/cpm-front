import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocType } from '../models/doc.model';

@Injectable()
export class ReportService {

  readonly url = 'https://cpm-rad-api-ing-dev.pea.co.th/api/v1/listofdoc';
  readonly apiUrl = 'https://cpm-rad-api-ing-dev.pea.co.th/api/v1'

  constructor(private http: HttpClient) { }

  // getProgressByContractId(id:number,page:number,limit:number):Observable<ResponsePage<ReportProgress>>{
  //   return this.http.get<ResponsePage<ReportProgress>>(`${this.url}/${id}?page=${page}&limit=${limit}`);
  // }

  getProgressByContractId<T>(id: number, params?: HttpParams): Observable<T> {
    const options = { params: params };
    return this.http.get<T>(`${this.url}/progress/contract/${id}`, options);
  }

  getApproveByContractId<T>(id: number, params?: HttpParams): Observable<T> {
    const options = { params: params };
    return this.http.get<T>(`${this.url}/check/contract/${id}`, options);
  }

  getReportByItem<T>(id: number, params?: HttpParams): Observable<T> {
    const options = { params: params };
    return this.http.get<T>(`${this.url}/${id}`, options);
  }

  deleteReport<T>(id: number, params?: HttpParams): Observable<T> {
    const options = { params: params };
    return this.http.delete<T>(`${this.apiUrl}/form/${id}`, options);
  }

  // getPdfReport<T>(id: number, params?: HttpParams): Observable<T> {
  //   const options = { params: params };
  //   return this.http.get<T>(`${this.apiUrl}/report/${id}/pdf`, options);
  // }
  getPdfReport(id: number) {
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(`${this.apiUrl}/report/${id}/pdf`, httpOptions);
    // return this.http.get<any>(`http://localhost:8000/api/v1/report/${id}/pdf`, httpOptions);

  }
  getFileAttach(id: number) {
    const httpOptions = {
      // 'responseType': 'arraybuffer' as 'json'
      'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(`${this.apiUrl}/download/${id}`, httpOptions);
    // return this.http.get<any>(`http://localhost:8000/api/v1/download/${id}`, httpOptions);

  }

  getFileAttachDownload(id: number) {
    const httpOptions = {
      // 'observe' : 'response',
      // 'responseType': 'arraybuffer' as 'json'
      'responseType'  : 'blob' as 'json',        //This also worked
      // 'headers' : {"Content-Disposition" : `attachment; filename="123.pdf"`}
    };
    return this.http.get<any>(`${this.apiUrl}/download/${id}`, httpOptions);
    // return this.http.get<any>(`http://localhost:8000/api/v1/download/${id}`, httpOptions);

  }

  //   get<T>(path: string): Observable<T> {
  //     let httpParams = new HttpParams();
  //     httpParams = httpParams.append("language", "en");
  //     httpParams = httpParams.append("pageNo", 1);
  //     httpParams = httpParams.append("pageSize", 10);

  //     const options = { params: httpParams };

  //     return this.http.get<T>(`${this.apiUrl}/${path}`, options);
  // }
}
