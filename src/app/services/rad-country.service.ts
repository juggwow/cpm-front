import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from "../models/country.model";

@Injectable()
export class RadCountryService {

  constructor(private http: HttpClient) { }

  getCountryList(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `https://cpm-rad-api-ing-dev.pea.co.th/api/v1/country`
    )
  }
}
