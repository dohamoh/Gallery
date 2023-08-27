import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AdminComponent } from './components/admin/admin.component';
import { PhotodetailsComponent } from './components/photodetails/photodetails.component';
import { AddComponent } from './components/add/add.component';
import { RefreshTokenComponent } from './components/refresh-token/refresh-token.component';
import { OwlModule } from 'ngx-owl-carousel';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    GalleryComponent,
    AdminComponent,
    PhotodetailsComponent,
    AddComponent,
    RefreshTokenComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule, OwlModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
