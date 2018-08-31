import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.logIn(this.loginForm.value.email, this.loginForm.value.password).subscribe((res) => {
      const token = res.headers.get('x-auth');
      if (token) {
        localStorage.setItem('userName', res.body.name);
        this.router.navigate(['/todos']);
      } else {
        this.errorMsg = 'User Not Found';
      }
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        this.errorMsg = 'Connection Error Please Check your internet connection';
      } else {
        this.errorMsg = 'Wrong Email Or Password';
      }
    });
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
