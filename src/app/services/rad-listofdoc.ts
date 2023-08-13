import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
      `${environment.apiUrl}/api/v1/listofdoc/9551`,
    );
  }



  getSortOrFilterListOfDoc$(param: HttpParams) {
    return this.http.get<ResponsePage<ListDocument>>(
      `${environment.apiUrl}/contract/31/boq`, { params: param }
    );
  }

  getListOfDocTypes(): Observable<DocType[]> {
    return this.http.get<DocType[]>(
      `${environment.apiUrl}/api/v1/doctype`
    )
  }


  getDoc$() {
    return this.http.get<Document>(
      `${environment.apiUrl}/form/19`,
    );
  }

  
  deleteDoc() {
    const formData = new FormData();
    formData.append("id", "19");
    formData.append("radid", "jasdasd123312");
    formData.append("updateby", "คนแก้ไข เอกสาร");
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: formData
      };

    return this.http.delete<any>(
        `${environment.apiUrl}/api/v1/form/11`, httpOptions
    )
  }
}