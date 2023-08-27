import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { ProductsService } from "src/app/services/products.service";
import { SharingService } from "src/app/services/sharing.service";

@Component({
  selector: "app-photodetails",
  templateUrl: "./photodetails.component.html",
  styleUrls: ["./photodetails.component.scss"],
})
export class PhotodetailsComponent {
  constructor(
    private ElementRef: ElementRef,
    private SharingService: SharingService,
    private ProductsService: ProductsService,
    private Router: Router
  ) {}
  num: any;
  edit: boolean = false;
  @Input() data: any;
  replyInput = false;
  commentInput = true;
  userData: any;
  DeleteID: any;
  name: any;
  description: any;
  files: any;
  deletedImgsData: any = {
    imgId: [],
    imgUrl: [],
  };
  comment: any;
  reply: any;
  disNum = 5;
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.SharingService.currentUserData.subscribe((data: any) => {
      this.userData = data;
    });
  }

  uploads(event: any) {
    const { files } = event.target;
    this.files = files;
    for (let i = 0; i < this.files.length; i++) {
      const element = this.files[i];
      const reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = (event: any) => {
        this.data.images.push(event.target.result);
      };
    }
  }

  getProduct() {
    this.ProductsService.getProduct(this.data._id).subscribe((data: any) => {
      this.data = data.product;
      this.SharingService.updateProducts();
    });
  }

  close() {
    this.Close.emit("");
  }

  ReplyInput(i: any) {
    let id = `reply${i}`;

    if (this.replyInput) {
      this.replyInput = !this.replyInput;
      let input = document.getElementById(id);
      input?.classList.add("hide");
    } else {
      this.replyInput = !this.replyInput;

      let input = document.getElementById(id);
      input?.classList.remove("hide");
    }
  }
  // CommentInput() {
  //   if (this.commentInput) {
  //     this.commentInput = !this.commentInput;
  //     this.ElementRef.nativeElement
  //       .querySelector("#comment")
  //       .classList.add("hide");
  //   } else {
  //     this.commentInput = !this.commentInput;
  //     this.ElementRef.nativeElement
  //       .querySelector("#comment")
  //       .classList.remove("hide");
  //   }
  // }

  plus() {
    if (this.num == this.data.images.length - 1) {
      this.num = 0;
    } else {
      this.num++;
    }
  }
  minus() {
    if (this.num == 0) {
      this.num = this.data.images.length - 1;
    } else {
      this.num--;
    }
  }
  @HostListener("window:click", ["$event"])
  closeDis(event: any) {
    if (event.target.id == "disImg" || event.target.id == "disImg1") {
      this.num = -1;
    }
  }
  openImage(i: Number, event: any) {
    if (event.target.id == "remove") {
      return;
    }
    this.num = i;
  }

  deleteImage(index: any) {
    this.deletedImgsData.imgId.push(`${this.data.publicImagesIds[index]}`);
    this.deletedImgsData.imgUrl.push(`${this.data.images[index]}`);
    this.data.images.splice(index, 1);
  }

  hideProd() {
    let data = {
      id: this.data._id,
    };
    this.ProductsService.hideProd(data).subscribe((data: any) => {
      if (data.message == "hide") {
        this.SharingService.updateProducts();
        this.close();
        this.edit = false;
      }
    });
  }
  deleteProduct(id: any) {
    this.ProductsService.deleteProduct(id).subscribe((data: any) => {
      if (data.message == "deleted") {
        this.SharingService.updateProducts();
        this.close();
      }
    });
  }
  openEdit() {
    this.name = this.data.name;
    this.description = this.data.description;
    this.edit = !this.edit;
  }
  save() {
    let formData = new FormData();

    if (this.files?.length != 0) {
      for (let i = 0; i < this.files?.length; i++) {
        const element: any = this.files[i];
        formData.append("image", element);
      }
    }

    formData.append("deleteUrl", this.deletedImgsData.imgUrl);
    formData.append("deleteId", this.deletedImgsData.imgId);
    formData.append("productId", this.data._id);
    formData.append("name", this.name);
    formData.append("description", this.description);

    this.ProductsService.update(formData).subscribe((data: any) => {
      if (data.message == "updated") {
        this.SharingService.updateProducts();
        this.close();
        this.edit = false;
      }
    });
  }
  cancel() {
    this.deletedImgsData = {
      imgId: [],
      productId: "",
      imgUrl: [],
    };
    this.files = "";
    this.close();
  }

  like(event: any) {
    let unLike = event.target.classList.replace("text-danger", "text-grey");
    if (!unLike) {
      event.target.classList.replace("text-grey", "text-danger");
    }

    let data = {
      productId: this.data._id,
      userId: this.userData._id,
    };

    this.ProductsService.like(data).subscribe((data: any) => {
      if (data.message == "like" || data.message == "unLike") {
        this.SharingService.updateUserData();
        this.getProduct();
      }
    });
  }
  addComment() {
    if (this.comment != '' && this.comment != undefined&& this.comment != null && this.comment != 'undefined') {
      let data = {
        comment: this.comment,
        productId: this.data._id,
        userId: this.userData._id,
      };
      this.ProductsService.addComment(data).subscribe((data: any) => {
        if (data.message == "Added comment") {
          this.comment = "";
          this.getProduct();
        }
      });
    }

  }
  addReply(id: any) {
    let data = {
      reply: this.reply,
      productId: this.data._id,
      userId: this.userData._id,
      commentId: id,
    };
    this.ProductsService.addReply(data).subscribe((data: any) => {
      if (data.message == "Added reply") {
        this.getProduct();
      }
    });
  }
  deleteComment(id: any) {
    let data = {
      productId: this.data._id,
      commentId: id,
    };
    this.ProductsService.deleteComment(data).subscribe((data: any) => {
      if (data.message == "Deleted comment") {
        this.getProduct();
      }
    });
  }
  hideComment(id: any) {
    let data = {
      productId: this.data._id,
      commentId: id,
    };
    this.ProductsService.hideComment(data).subscribe((data: any) => {
      if (data.message == "Hide comment") {
        this.getProduct();
      }
    });
  }
  ifLike(): any {
    for (let i = 0; i < this.userData.likes.length; i++) {
      const element = this.userData.likes[i];

      if (element == this.data._id) {
        return true;
      }
    }
    return false;
  }
}
