import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PageOption, ResponsePage } from 'src/app/models/response-page.model';
import { Boq } from '../models/boq.model';


@Injectable()
export class BoqService {
    constructor(private http: HttpClient) {}

    getAllBoq$() {
        return this.http.get<ResponsePage<Boq>>(
            `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/contract/31/boq`,
      
        );
    }

}
