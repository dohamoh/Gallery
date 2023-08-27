import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {

constructor(private SharingService:SharingService,private Router:Router){
this.SharingService.currentUserData.subscribe((data:any)=>{

  this.userData = data
})
}
  add:Boolean = false
  userData:any
  logout(){
    localStorage.removeItem('userToken')
    this.SharingService.clearData()
this.Router.navigate(['/register'])
  }
}
