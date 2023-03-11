import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Boq } from '../models/boq.model';
import { Form } from '../models/form.model';
import {Upload}from '../models/upload.model'

@Injectable()
export class FormService {
    constructor(private http: HttpClient) {}

    addNewForm(form:Form) {
        return this.http.post<Form>(
            `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/form`,form
      
        );
    }

    upload(field:String,itemid:String,files:any) {
        const formData = new FormData();
        console.log("file",files)
        formData.append("upload", files[0]);  

        const headers= new HttpHeaders().set('Access-Control-Allow-Origin', '*');


        return this.http.post<Upload>(
            `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/upload/${field}/${itemid}`,formData, { 'headers': headers }
      
        );
    }

}
