import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocType } from '../models/doc.model';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  // getProgressByContractId(id:number,page:number,limit:number):Observable<ResponsePage<ReportProgress>>{
  //   return this.http.get<ResponsePage<ReportProgress>>(`${this.url}/${id}?page=${page}&limit=${limit}`);
  // }

  getWaitForApprovReportByContractId<T>(contractid: number, params?: HttpParams): Observable<T> {
    const options = { params: params };
    return this.http.get<T>(`${environment.apiUrl}/report/wait-for-approv/${contractid}`, options);
  }

  getProgressByContractId<T>(id: number, params?: HttpParams): Observable<T> {
    const options = { params: params };
    return this.http.get<T>(`${environment.apiUrl}/listofdoc/progress/contract/${id}`, options);
  }

  getApproveByContractId<T>(id: number, params?: HttpParams): Observable<T> {
    const options = { params: params };
    return this.http.get<T>(`${environment.apiUrl}/listofdoc/check/contract/${id}`, options);
  }

  getReportByItem<T>(id: number, params?: HttpParams): Observable<T> {
    const options = { params: params };
    return this.http.get<T>(`${environment.apiUrl}/listofdoc/${id}`, options);
  }

  deleteReport<T>(id: number, params?: HttpParams): Observable<T> {
    const options = { params: params };
    return this.http.delete<T>(`${environment.apiUrl}/form/${id}`, options);
  }

  getPdfReport<T>(id: number): Observable<T> {
    const options = { 
      // 'responseType': 'arraybuffer' as 'json'
      'responseType'  : 'blob' as 'json' 
    };
    return this.http.get<T>(`${environment.apiUrl}/report/${id}/pdf`, options);
  }

  getFileAttach<T>(id: number): Observable<T> {
    const options = { 
      // 'responseType': 'arraybuffer' as 'json'
      'responseType'  : 'blob' as 'json' 
    };
    return this.http.get<T>(`${environment.apiUrl}/download/${id}`, options);
  }

  // getPdfReport(id: number) {
  //   const httpOptions = {
  //     // 'responseType': 'arraybuffer' as 'json'
  //     'responseType'  : 'blob' as 'json'        //This also worked
  //   };
  //   return this.http.get<any>(`${this.apiUrl}/report/${id}/pdf`, httpOptions);
  //   // return this.http.get<any>(`${environment.apiUrl}/report/${id}/pdf`, httpOptions);

  // }
  // getFileAttach(id: number) {
  //   const httpOptions = {
  //     // 'responseType': 'arraybuffer' as 'json'
  //     'responseType'  : 'blob' as 'json'        //This also worked
  //   };
  //   return this.http.get<any>(`${this.apiUrl}/download/${id}`, httpOptions);
  //   // return this.http.get<any>(`${environment.apiUrl}/download/${id}`, httpOptions);

  // }

  // getFileAttachDownload(id: number) {
  //   const httpOptions = {
  //     // 'observe' : 'response',
  //     // 'responseType': 'arraybuffer' as 'json'
  //     'responseType'  : 'blob' as 'json',        //This also worked
  //     // 'headers' : {"Content-Disposition" : `attachment; filename="123.pdf"`}
  //   };
  //   return this.http.get<any>(`${this.apiUrl}/download/${id}`, httpOptions);
  //   // return this.http.get<any>(`${environment.apiUrl}/download/${id}`, httpOptions);

  // }

  //   get<T>(path: string): Observable<T> {
  //     let httpParams = new HttpParams();
  //     httpParams = httpParams.append("language", "en");
  //     httpParams = httpParams.append("pageNo", 1);
  //     httpParams = httpParams.append("pageSize", 10);

  //     const options = { params: httpParams };

  //     return this.http.get<T>(`${this.apiUrl}/${path}`, options);
  // }
}
