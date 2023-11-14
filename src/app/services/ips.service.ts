import { Injectable } from '@angular/core';
import { ipModel } from '../models/ipModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ipAddressModel } from '../models/ipAddressModel';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IpsService {

  private apiUrl = 'http://localhost:250/api/ipaddress';
  private token = this.loginService.getToken(); 

  constructor(private http: HttpClient, public loginService: LoginService) { }
  
  public ipsData: ipModel[]= [
    { id: 1, direccion: 'IP 1'},
    { id: 2, direccion: 'IP 2'},
    { id: 3, direccion: 'IP 3'},
  ];

  obtenerIps() {
    return this.ipsData
  }

  getIps(): Observable<ipAddressModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers })
  }

  mapIPModel(ipModel: any): ipModel {
    return {
      id: ipModel.id,
      direccion: ipModel.direccion,
    };
  }

}