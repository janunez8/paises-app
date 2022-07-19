import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private api_key: string = 'https://restcountries.com/v3.1';
  get params() {
    return new HttpParams()
      .set('fields', 'name,capital,cca2,flags,population')
  }
  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.api_key}/name/${termino}`;
    return this.http.get<Country[]>(url, { params: this.params });
  }

  buscarPorCapital(termino: string): Observable<Country[]> {
    const url = `${this.api_key}/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this.params });
  }

  getPaisPorAlpha(termino: string): Observable<Country[]> {
    const url = `${this.api_key}/alpha/${termino}`;
    return this.http.get<Country[]>(url);
  }

  getPaisesPorRegion(termino: string): Observable<Country[]> {
    const url = `${this.api_key}/region/${termino}`;
    return this.http.get<Country[]>(url, { params: this.params });
  }
}
