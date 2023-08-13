import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Form } from '../models/form.model';
import { Upload } from '../models/upload.model'

@Injectable()
export class FormService {
  constructor(private http: HttpClient) { }

  // readonly apiUrl = 'https://cpm-rad-api-ing-dev.pea.co.th/api/v1'

  addNewForm(form: Form) {
    return this.http.post<Form>(`${environment.apiUrl}/form`, form);
  }

  reportView<T>(id: number): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/report/${id}`)
  }

  // upload(field: String, itemid: String, files: any) {
  //   const formData = new FormData();
  //   console.log("file", files)
  //   formData.append("upload", files[0]);

  //   const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');


  //   return this.http.post<Upload>(
  //     `${environment.apiUrl}/upload/${field}/${itemid}`, formData, { 'headers': headers }

  //   );
  // }

  getListOfDocTypes<T>(): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/doctype`)
  }

  getCountryList<T>(): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/country`);
  }

  addNewReport<T>(formData: FormData): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/report`, formData);
  }

  editReport<T>(formData: FormData, id: number): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/report/${id}`, formData);
  }

}