import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { passwordValidator } from '../directives/password-validator.directive';
import { AuthService, ResponseObject } from '../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  response: ResponseObject | undefined;
  registerMessage: string = '';
  signup: boolean = false;
  signupForm!: FormGroup;
  error: any;

  

  constructor(
    private http: HttpClient,
    private router: Router,
    private Auth: AuthService
  ) {}
  
  
  ngOnInit(): void {
    const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.signupForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[A-Za-z]+$'),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[A-Za-z]+$'),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(re),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}'
          ),
        ]),
        cpassword: new FormControl('', [Validators.required]),
      },
      { validators: passwordValidator }
    );
    
    

    
  }


  get firstName() {
    return this.signupForm.get('firstName')!;
  }
  get lastName() {
    return this.signupForm.get('lastName')!;
  }
  get email() {
    return this.signupForm.get('email')!;
  }
  get password() {
    return this.signupForm.get('password')!;
  }
  get cpassword() {
    return this.signupForm.get('cpassword')!;
  }

  onSubmit() {
    let url = 'http://localhost:5000/api/register-user';
    let userData = {
      firstName: this.signupForm.value['firstName'],
      lastName: this.signupForm.value['lastName'],
      email: this.signupForm.value['email'],
      password: this.signupForm.value['password'],
    };

    this.Auth.signup(userData).subscribe({
      next: (data: ResponseObject) => {
        this.response = { ...data };
        this.registerMessage = this.response['statusMessage'];
        if (this.response['statusCode'] === '200') {
          localStorage.setItem('auth-token', this.response['token']);
          this.signup = true;
          setTimeout(() => {
            this.router.navigate([`/upload`]);
          }, 2000);
        }
      },
      error: (error) => (this.error = error), // error path
    });
  }

  
}
