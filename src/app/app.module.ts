import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base/base.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { TodoCUComponent } from './todo-cu/todo-cu.component';
import { FilterPipe } from './filter.pipe';
import { AuthGuardService } from './auth-guard.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { GuardService } from './guard.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    BaseComponent,
    TodoListComponent,
    TodoComponent,
    TodoCUComponent,
    FilterPipe,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, AuthGuardService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
