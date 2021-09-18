import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { country } from 'src/app/common/const';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  currentUser;
  userForm: FormGroup;
  submitted = false;
  cfpassword;
  countries = [];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) {
    this.userForm = this.formBuilder.group({
      username: [''],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      city: [''],
      country: [''],
      email: [''],
      street: [''],
      state: [''],
      zipcode: [''],

    });
  }


  ngOnInit() {
    this.countries = country;
    this.currentUser = this.authService.currentUserValue;
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onSubmit(formGroup){
    if(this.validOrder(formGroup)){
      this.spinner.show();
      this.authService.updateUser(this.currentUser, this.currentUser.id).subscribe(
        res => {
          this.authService.currentUserSubject.next(res);
          localStorage.setItem(this.authService._USER_KEY, JSON.stringify(res));
          this.alertService.success("Update successful");
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          this.alertService.error("Update failed");
        }
      )
    }

  }

    /**
   * Check valid form
   * @param formGroup
   * @returns
   */
     validOrder(formGroup) {
      let result = true;
      if (formGroup.invalid) {
        this.markFormGroupTouched(formGroup);
        result = false;
      }
        return result;
      }

      /**
      * Marks all controls in a form group as touched
      * @param formGroup - The form group to touch
      */
      private markFormGroupTouched(formGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
          control.markAsTouched();

          if (control.controls) {
            this.markFormGroupTouched(control);
          }
        });
      }

}
