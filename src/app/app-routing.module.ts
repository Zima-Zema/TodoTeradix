import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BaseComponent } from './base/base.component';
import { TodoCUComponent } from './todo-cu/todo-cu.component';
import { AuthGuardService } from './auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'todos', component: BaseComponent, canActivate: [AuthGuardService] },
  { path: 'todo', component: TodoCUComponent, canActivate: [AuthGuardService]},
  { path: 'todo/:id', component: TodoCUComponent, canActivate: [AuthGuardService]},
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
