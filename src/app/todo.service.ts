import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from '../../node_modules/rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  getTodoById(_id: string) {
    return this.http.get<Todo>(`${this.baseUrl}/todos/${_id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(`${this.baseUrl}/todos`, todo, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  updateTodo(_id: string, todo: Todo) {
    return this.http.put(`${this.baseUrl}/todos/${_id}`, todo, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  removeTodo(_id: string) {
    return this.http.delete<Todo>(`${this.baseUrl}/todos/${_id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

}
