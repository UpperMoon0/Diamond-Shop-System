import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../auth/services/account.service";
import {AuthGoogleService} from "../../../core/shared/auth-google.service";
import {ToastrService} from "ngx-toastr";
import {first} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css']
})
export class MyLoginComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  loginForm !:FormGroup;
  registerForm !:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private authGoogleService: AuthGoogleService,
    private toastrService: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  get callLogin() { return this.loginForm.controls; }
  get callRegister() { return this.registerForm.controls; }

  onSingIn() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("loois klklkjlk");
      return;
    }
    this.loading = true;
    console.log(this.callLogin['email'].value, this.callLogin['password'].value);

    // Send the JSON object to the specified URL
    this.accountService.login(this.callLogin['email'].value, this.callLogin['password'].value);
  }

  signInWithGoogle(): void {
    this.authGoogleService.login();
    this.toastrService.success("login sucescss");
  }

  moveToForgetPassword(){
    this.router.navigate(['reset-password']);
  }

}
