import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  theData:any
  data:any
  userData:any
  constructor(private ProductsService:ProductsService,private SharingService:SharingService){
    this.SharingService.currentUserData.subscribe((data:any)=>{
      this.userData = data;
    })
    this.SharingService.currentProducts.subscribe((data:any)=>{



this.data = data
    })
  }

}
