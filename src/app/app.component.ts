import { Component, HostListener, Input } from '@angular/core';
import { SharingService } from './services/sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FE';
  constructor(private SharingService:SharingService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  if (localStorage.getItem('userToken')) {
this.SharingService.updateUserData()
}
this.SharingService.updateProducts()
}
}
