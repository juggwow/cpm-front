import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from '../models/form.model';
import { Upload } from '../models/upload.model'

@Injectable()
export class FormService {
  constructor(private http: HttpClient) { }

  readonly apiUrl = 'https://cpm-rad-api-ing-dev.pea.co.th/api/v1'

  addNewForm(form: Form) {
    return this.http.post<Form>(
      `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/form`, form

    );
  }

  reportView<T>(id:number): Observable<T>{
    return this.http.get<T>(`${this.apiUrl}/form/view/${id}`)
  }

  upload(field: String, itemid: String, files: any) {
    const formData = new FormData();
    console.log("file", files)
    formData.append("upload", files[0]);

    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');


    return this.http.post<Upload>(
      `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/upload/${field}/${itemid}`, formData, { 'headers': headers }

    );
  }

  getListOfDocTypes<T>(): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/doctype`)
  }

  getCountryList<T>(): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/country`);
  }

  addNewReport<T>(formData: FormData) : Observable<T>{
    return this.http.post<T>(`${this.apiUrl}/report`, formData);
  }

}