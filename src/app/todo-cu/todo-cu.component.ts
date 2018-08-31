import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Todo } from '../todo';
import { Location } from '@angular/common';
@Component({
  selector: 'app-todo-cu',
  templateUrl: './todo-cu.component.html',
  styleUrls: ['./todo-cu.component.css']
})
export class TodoCUComponent implements OnInit {
  errorMsg;
  todo: Todo = {
    _id: '',
    _creator: '',
    completed: null,
    completedAt: null,
    subject: '',
    title: ''
  };
  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    completed: new FormControl('')
  });
  modelId;
  constructor(private route: ActivatedRoute, private location: Location, private todoService: TodoService) { }

  ngOnInit() {
    this.modelId = this.route.snapshot.paramMap.get('id');
    if (this.modelId) {
      this.todoService.getTodoById(this.modelId).subscribe((todo) => {
        this.todo = todo.body;
      });
    }
  }

  onSubmit() {
    if (this.modelId) {
      this.todoService.updateTodo(this.modelId, this.todo).subscribe((todo) => {
        this.location.back();
      }, (error) => {

      });
    } else {
      this.todoService.addTodo(this.todo).subscribe((todo) => {
        this.todoForm.reset();
      }, (error) => {
      });
    }
  }

  onCancel() {
    this.location.back();
  }
  get title() { return this.todoForm.get('title'); }
  get subject() { return this.todoForm.get('subject'); }
  get completed() { return this.todoForm.get('completed'); }
}
