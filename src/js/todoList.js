// This module defines the Todo and Project classes, and functions to manage projects and todos.

// Classes
class Todo {
    // The constructor takes the title, description, due date, and priority as parameters
    constructor(title, dueDate, priority = 1) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}

class Project {
    // The constructor takes the title as a parameter
    // It initializes the title, an empty array for todos, and a boolean for active status
    constructor(title) {
      this.title = title;
      this.todos = [];
      this.active = false;
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

    sortTodosByDueDate() {
        this.todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    
    sortTodosByPriority() {
        this.todos.sort((a, b) => a.priority - b.priority);
    }

    completeTodo(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index].completed = true;
        }
    }
}


// Example usage
const projectObjects = [];
const project1 = new Project("Project 1");
const project2 = new Project("Project 2");
projectObjects.push(project1);
projectObjects.push(project2);

const todo1 = new Todo("Todo 1",  "2023-10-01", 2);
const todo2 = new Todo("Todo 2", "2023-10-02", 1);
project1.addTodo(todo1);
project1.addTodo(todo2);
project2.addTodo(new Todo("Todo 3",  "2023-10-03", 3));
project1.completeTodo(0); // Mark the first todo in project1 as completed
project1.sortTodosByDueDate(); // Sort todos in project1 by due date
project1.sortTodosByPriority(); // Sort todos in project1 by priority
const project3 = new Project("Projecfefet 3");
projectObjects.push(project3);
project3.addTodo(new Todo("Todo 4", "2023-10-04", 1));
project3.addTodo(new Todo("Todo 5", "2023-10-05", 2));
project3.addTodo(new Todo("Todo 6", "2023-10-06", 3));
project3.addTodo(new Todo("Todo 7", "2023-10-07", 4));


// Functions to manage active projects
function checkActiveProject(projectObjects) {
    for (let i = 0; i < projectObjects.length; i++) {
        if (projectObjects[i].active) {
            return projectObjects[i];
        }
    }
    return null;
}

function setActiveProject(project, projectObjects) {
    for (let i = 0; i < projectObjects.length; i++) {
        if (projectObjects[i] === project) {
            projectObjects[i].active = true;
        } else {
            projectObjects[i].active = false;
        }
    }
}

function consoleLogProjects() {
    for (let i = 0; i < projectObjects.length; i++) {
        const project = projectObjects[i];
        console.log(`Project ${i + 1}: ${project.title}`);
        console.log("Todos:");
        for (let j = 0; j < project.getTodos().length; j++) {
            const todo = project.getTodos()[j];
            console.log(`- ${todo.title} (Due: ${todo.dueDate}, Priority: ${todo.priority})`);
        }
    }
}

// Log the projects and their todos
// consoleLogProjects();

  export  {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects};
  