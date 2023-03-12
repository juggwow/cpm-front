import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PageOption, ResponsePage } from 'src/app/models/response-page.model';
import { ListDocument, DocType ,Document} from '../models/doc.model';
import { Observable } from 'rxjs';


@Injectable()
export class ListDocumentService {
  constructor(private http: HttpClient) { }

  getListOfDoc$() {
    return this.http.get<ResponsePage<ListDocument>>(
      `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/listofdoc/9551`,
    );
  }



  getSortOrFilterListOfDoc$(param: HttpParams) {
    return this.http.get<ResponsePage<ListDocument>>(
      `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/contract/31/boq`, { params: param }
    );
  }

  getListOfDocTypes(): Observable<DocType[]> {
    return this.http.get<DocType[]>(
      `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/doctype`
    )
  }


  getDoc$() {
    return this.http.get<Document>(
      `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/form/19`,
    );
  }



}


