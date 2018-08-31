import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { element } from '../../../node_modules/protractor';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todosList: Todo[] = [];
  completeList: Todo[] = [];
  errormsg;
  searchText: string;
  completetFilter = false;
  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.completeList = todos.body;
      if (this.completetFilter) {
        this.todosList = this.completeList.filter((ele) => ele.completed === true);
      } else {
        this.todosList = this.completeList.filter((ele) => (ele.completed === false || ele.completed === null));
      }

    });
  }

  onUpdateTodo(todo: Todo) {
    this.router.navigate(['/todo', todo._id]);
  }
  onDeleteTodo(todo: Todo) {
    this.todoService.removeTodo(todo._id).subscribe(res => {
      switch (res.status) {
        case 200:
          this.todosList = this.todosList.filter(ele => ele._id !== todo._id);
          break;
        case 400:
          this.errormsg = 'somthing wrong happend';
          break;
        case 404:
          this.errormsg = 'Todo not Found Or Invalid Data transfer';
          break;
        default:
          break;
      }
    });
  }
  onInsertTodo(todo: Todo) {
    this.router.navigate(['/todo']);
  }
  onFilter(event) {
    if (event.target.checked) {
      this.todosList = this.completeList.filter((ele) => ele.completed === true);
    } else {
      this.todosList = this.completeList.filter((ele) => (ele.completed === false || ele.completed === null));
    }



  }

}
