import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../_services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const param = {
      username: this.f.username.value,
      password: this.f.password.value
    }
    this.spinner.show();
    this.authService.createSession(param).subscribe(
      res => {
        this.spinner.hide();
        if(res.length){
          const currentUser = res[0];
          localStorage.setItem(this.authService._USER_KEY, JSON.stringify(currentUser));
          this.authService.currentUserSubject.next(currentUser);
          this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || `pages/home`]);
        } else {
          this.alertService.error('Username or Password is not correct')
        }

      },
      err => {
        this.spinner.hide();
        console.error(err);
      }
    )
  }
}
