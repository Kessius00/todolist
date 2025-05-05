class Todo {
    constructor(title, description, dueDate, priority = 1) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}
  
class Project {
    constructor(title) {
      this.title = title;
      this.todos = [];
      this.active = false;
    }
    setActive() {
        this.active = true;
    }
    setInactive() {
        this.active = false;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
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

    completeTodo(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index].completed = true;
        }
    }
}
  
  export  {Todo, Project};
  