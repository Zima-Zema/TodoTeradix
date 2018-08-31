import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMsg;
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.register({
      email: this.signupForm.value.email,
      name: this.signupForm.value.name,
      password: this.signupForm.value.password
    }).subscribe((res) => {
      const token = res.headers.get('x-auth');
      if (token) {
        localStorage.setItem('userName', this.signupForm.value.name);
        this.router.navigate(['/todos']);
      } else {
        this.errorMsg = 'Registration Failed Try Again Later';
      }
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        this.errorMsg = 'Connection Error Please Check your internet connection';
      } else {
        switch (err.status) {
          case 302:
            this.errorMsg = 'This Email Is Already Used';
            break;
          case 404:
            this.errorMsg = err.error.message;
            break;
          case 500:
          default:
            this.errorMsg = 'Somthig Wrong happened';

            break;
        }
      }
    });

  }
  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
}
