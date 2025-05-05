class Todo {
    constructor(title, description, dueDate, priority = 1) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
    }
  }
  
  class TodoList {
    constructor() {
      this.todos = [];
    }
  
    addTodo(todo) {
      if (todo instanceof Todo) {
        this.todos.push(todo);
      } else {
        throw new Error("addTodo expects an instance of Todo");
      }
    }
  
    removeTodo(index) {
      if (index >= 0 && index < this.todos.length) {
        this.todos.splice(index, 1);
      }
    }
  
    getTodos() {
      return this.todos;
    }
  }
  
  export  {Todo, TodoList};
  