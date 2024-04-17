import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import * as fs from 'fs';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private readonly filePath = './todos.json';

  constructor() {
    this.loadTodosFromFile();
  }

  private loadTodosFromFile(): void {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.todos = JSON.parse(data);
    } catch (error) {
      this.todos = [];
    }
  }

  private saveTodosToFile(): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(this.todos, null, 2),
      'utf-8',
    );
  }

  create(createTodoDto: CreateTodoDto): Todo {
    let todo: Todo = { ...createTodoDto, id: Date.now(), done: false };
    this.todos.push(todo);
    this.saveTodosToFile();
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return null;
    }
    this.todos[index] = { ...updateTodoDto, id };
    this.saveTodosToFile();
    return this.todos[index];
  }

  delete(id: number): Todo {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return null;
    }
    const deleted = this.todos.splice(index, 1);
    this.saveTodosToFile();
    return deleted[0];
  }
}
