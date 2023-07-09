import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from "../models/country.model";

@Injectable()
export class RadCountryService {

  constructor(private http: HttpClient) { }

  
}
