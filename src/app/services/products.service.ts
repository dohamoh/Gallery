import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'gallery-apis-delta.vercel.app/product';
  // private baseUrl = 'http://localhost:3000/product';

  constructor(private HttpClient:HttpClient) { }
  add(data:any){
    return this.HttpClient.post(`${this.baseUrl}/add`, data);
  }
  getProducts(){
    return this.HttpClient.get(`${this.baseUrl}/getProducts`);
  }
  getProduct(id:any){
    return this.HttpClient.get(`${this.baseUrl}/getProduct/${id}`);
  }
  deleteImage(data:any){
    return this.HttpClient.put(`${this.baseUrl}/deleteImage`,data);
  }


  update(formData:any){
    return this.HttpClient.put(`${this.baseUrl}/update`,formData);
  }
  hideProd(data:any){
    return this.HttpClient.put(`${this.baseUrl}/hideProd`,data);
  }

  deleteProduct(id:any){
    return this.HttpClient.delete(`${this.baseUrl}/deleteProduct/${id}`);
  }
  like(data:any){
    return this.HttpClient.put(`${this.baseUrl}/like`,data);
  }
  addComment(data:any){
    return this.HttpClient.put(`${this.baseUrl}/addComment`,data);
  }
  deleteComment(data:any){
    return this.HttpClient.put(`${this.baseUrl}/deleteComment`,data);
  }
  hideComment(data:any){
    return this.HttpClient.put(`${this.baseUrl}/hideComment`,data);
  }
  addReply(data:any){
    return this.HttpClient.put(`${this.baseUrl}/addReply`,data);
  }

}
