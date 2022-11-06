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
    this.fetchTodos();
  }

  public addTodo(inp: HTMLInputElement): void {
    fetch(`http://192.168.1.15:3000/todos`,
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: inp.value })
      })
      .then(res => res.json())
      .then(newId => {
        inp.value = '';
        this.fetchTodos();
      });
  }

  public editTodo(id: string, inp: HTMLInputElement): void {
    fetch(`http://192.168.1.15:3000/todos/${id}`,
      {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: inp.value })
      })
      .then(() => {
        inp.value = '';
        this.fetchTodos();
      });
  }

  public deleteTodo(id: string): void {
    fetch(`http://192.168.1.15:3000/todos/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(value => {
        if (value === `Todo #${id} was deleted.`) {
          this.fetchTodos();
        }
      }
    );
  }

  public fetchTodos(): void {
    fetch(`http://192.168.1.15:3000/todos`)
    .then(res => res.json())
    .then((todos: Todo[]) => {
      this.todos = todos.sort((a, b) => a.todo_id < b.todo_id ? -1 : 1);
    });
  }
}
