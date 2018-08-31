import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BaseComponent } from './base/base.component';
import { TodoCUComponent } from './todo-cu/todo-cu.component';
import { AuthGuardService } from './auth-guard.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { GuardService } from './guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [GuardService] },
  { path: 'login', component: LoginComponent, canActivate: [GuardService] },
  { path: 'signup', component: SignupComponent, canActivate: [GuardService] },
  { path: 'todos', component: BaseComponent, canActivate: [AuthGuardService] },
  { path: 'todo', component: TodoCUComponent, canActivate: [AuthGuardService] },
  { path: 'todo/:id', component: TodoCUComponent, canActivate: [AuthGuardService] },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
