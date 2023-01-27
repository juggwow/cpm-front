import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Boq } from '../models/boq.model';
import { Form } from '../models/form.model';


@Injectable()
export class FormService {
    constructor(private http: HttpClient) {}

    addNewForm(form:Form) {
        return this.http.post<Form>(
            `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/form`,form
      
        );
    }

}
