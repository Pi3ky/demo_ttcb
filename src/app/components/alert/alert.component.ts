import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AlertService } from "src/app/_services/alert.service";

@Component({
  selector: "alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;

  constructor(
    private alertService: AlertService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe((message) => {
      switch (message && message.type) {
        case "success":
          this.toastr.success(message.text, "Successfully!", message.option);
          break;
        case "error":
          this.toastr.error(message.text, "Error!", message.option);
          break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
