import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ResponseObject } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass'],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  response: ResponseObject | undefined;
  error: any;
  authMessage: string = "";
  signin : boolean = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get email() {
    return this.signinForm.get('email')!;
  }
  get password() {
    return this.signinForm.get('password')!;
  }

  onSubmit(){
    this.auth.signin(this.signinForm.value['email'], this.signinForm.value['password']).subscribe({
      next: (data: ResponseObject) => {
        this.response = { ...data };
        this.authMessage = this.response["statusMessage"]
        if (this.response['statusCode'] === '200') {
          this.signin = true
          localStorage.setItem('auth-token', this.response['token']);
          setTimeout(() => {
            this.router.navigate([`/upload`]);
          }, 2000);
        }
      }, // success path
      error: (error) => (this.error = error), // error path
    });
  }
}
