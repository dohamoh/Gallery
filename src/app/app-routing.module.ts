import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/login/login.component';
import { RefreshTokenComponent } from './components/refresh-token/refresh-token.component';
import { LogoutGuard } from './services/logout.guard';

const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:'full'},
  {path:'home',component:HomeComponent},

  {path:'gallery',component:GalleryComponent},
  {path:'register',canActivate:[LogoutGuard],component:LoginComponent},
  {path:'refreshToken',canActivate:[LogoutGuard],component:RefreshTokenComponent},

  {path:'*',redirectTo:"home",pathMatch:'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
