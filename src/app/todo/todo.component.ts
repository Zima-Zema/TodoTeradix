import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onTodoUpdated(todo) {
    this.todoUpdated.emit(todo);
  }
  onTodoDeleted(todo) {
    this.todoDeleted.emit(todo);
  }
  onComplete(e) {
    if (e.target.checked) {
      this.todo.completed = true;
      this.todoService.updateTodo(this.todo._id, this.todo).subscribe((res) => {
      }, (err) => {
        this.todo.completed = false;
      });
    } else {
      this.todo.completed = false;
      this.todoService.updateTodo(this.todo._id, this.todo).subscribe((res) => {
      }, (err) => {
        this.todo.completed = true;
      });
    }
  }

}
