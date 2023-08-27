import { SharingService } from 'src/app/services/sharing.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();
  description:any=''
  name:any=''
  files:any
  errMessage:any
  loading:Boolean = false
  added:any=''
constructor(private ProductsService:ProductsService,private SharingService:SharingService){}
  add() {
if (this.name != '' && this.name != undefined && this.name != 'undefined'&& this.name != null &&this.description != '' && this.description != undefined && this.description != 'undefined'&& this.description != null && this.files != '' && this.files != undefined && this.files != 'undefined'&& this.description != null) {
this.loading = !this.loading
  this.errMessage = ''
  const formData = new FormData();
  for (let i = 0; i < this.files?.length; i++) {
    const element = this.files[i];
    formData.append('image', element);
  }

  formData.append('name', this.name);
  formData.append('description', this.description);


  this.ProductsService.add(formData).subscribe((data:any) => {
    if (data.message == 'Created') {
this.loading = !this.loading
this.added = 'ADDED'
setTimeout(() => {
this.added = ''
  
}, 2000);
      this.description = ''
      this.name = ''
      this.files =''
      this.SharingService.updateProducts()
      this.close()
    }
  })

}else{
this.errMessage ='الاسم و الوصف و الصوره مطلوبان'
}
  }
  uploads(event: any) {
    const { files } = event.target;
    this.files = files;
  }


  close() {
    this.Close.emit(false);
  }
}
