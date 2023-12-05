import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private urlApi = 'http://localhost:5000/api/entradas';

  constructor(private http: HttpClient) { }



  crearEntrada(entrada: FormData): Observable<any> {
    return this.http.post(this.urlApi, entrada, { withCredentials: true });
  }
}
