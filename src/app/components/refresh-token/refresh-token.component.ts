import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-refresh-token",
  templateUrl: "./refresh-token.component.html",
  styleUrls: ["./refresh-token.component.scss"],
})
export class RefreshTokenComponent {
  constructor(private Router: Router) {}
  count = 10;
  ngOnInit(): void {
this.COUNT()
  }




  COUNT()
  {
    setTimeout(() => {

        if (this.count === 0) {
          this.Router.navigate(["/register"]);
        } else {
          this.count = this.count - 1;
          this.COUNT()
        }
    }, 1000);
  }



}
