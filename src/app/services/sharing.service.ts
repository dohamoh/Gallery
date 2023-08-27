import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor(private AuthService:AuthService,private Router:Router,private ProductsService:ProductsService) { }
  private userData = new BehaviorSubject<any>([]);
  currentUserData = this.userData.asObservable();

  private products = new BehaviorSubject<any>([]);
  currentProducts = this.products.asObservable();


  updateUserData() {
    if (localStorage.getItem('userToken')) {
      this.AuthService.getUserData(localStorage.getItem('userToken')).subscribe(
        (data: any) => {

          if (data.userData) {
            this.userData.next(data.userData);
          }
        },
        (err: HttpErrorResponse) => {
          if (
            err.error.message == 'jwt expired' ||
            err.error.message == 'jwt malformed'
          ) {
            localStorage.removeItem('userToken');
            this.Router.navigate([`/register`]);
          }
        }
      );
    }
  }

  updateProducts() {
    this.ProductsService.getProducts().subscribe((data:any)=>{
      this.products.next(data.products);
    })
  }

clearData()
{
  this.userData.next('');
}
}
