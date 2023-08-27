import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'gallery-apis-delta.vercel.app/auth';

  // private baseUrl = 'http://localhost:3000/auth';
  constructor(private HttpClient:HttpClient) { }
  signUp(data: any): any {
      return this.HttpClient.post(`${this.baseUrl}/signUp`, data);
    }
    login(data: any): any {
      return this.HttpClient.post(`${this.baseUrl}/login`, data);
    }
    sendMessage(data: any): any {
      return this.HttpClient.post(`${this.baseUrl}/sendMessage`, data);
    }
    getUserData(token: any): any {


      return this.HttpClient.get(`${this.baseUrl}/getUserData/${token}`);
    }
}
