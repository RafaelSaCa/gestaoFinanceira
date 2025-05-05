import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PayLoadLogin } from '../model/payload-login';
import { PayloadRegister } from '../model/payload-register';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl ="http://localhost:8080/auth";

  constructor( private http: HttpClient) { }

  login(payload:PayLoadLogin): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,payload);
  }

  register(dados: PayloadRegister): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,dados);
  }
}
