import { Component } from '@angular/core';

interface Todo {
  todo_id: string;
  description: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public todos: Todo[] = [];

  constructor() {
    fetch(`http://192.168.1.15:3000/todos`)
      .then(res => res.json())
      .then((todos: Todo[]) => {
        this.todos = todos.sort((a, b) => a.todo_id < b.todo_id ? -1 : 1);
      });
  }
}
