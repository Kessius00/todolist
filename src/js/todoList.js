class Todo {
    constructor(title, description, dueDate, priority = 1) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}
  
class TodoList {
    constructor(title) {
      this.title = title;
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

    randomizeOrder() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.todos.length -1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            let k = this.todos[i];
            this.todos[i] = this.todos[j];
            this.todos[j] = k;
        }
    }

    completeTodo(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index].completed = true;
        }
    }
}
  
  export  {Todo, TodoList};
  