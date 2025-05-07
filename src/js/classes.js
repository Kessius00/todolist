// This module defines the Todo and Project classes, and functions to manage projects and todos.

const projectObjects = [];


// Classes
class Todo {
    // The constructor takes the title, description, due date, and priority as parameters
    constructor(title, dueDate, priority = 1) {
        this.id = crypto.randomUUID(); // Generate a unique ID using crypto
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = null; // Initialize project to null
        this.completed = false;
    }

}

class Project {
    constructor(title) {
        this.id = crypto.randomUUID(); // Generate a unique ID using crypto
        this.title = title;
        this.todos = [];
        this.active = false;
    }
    
    addTodo(todo) {
        if (todo instanceof Todo) {
            this.todos.push(todo); // Set the project for the todo
            todo.project = this;
        } else {
            throw new Error("addTodo expects an instance of Todo");
        }
    }
    removeTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
        } else {
            throw new Error(`Todo with id ${id} not found`);
        }
    }
    getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
    }
    sortTodosByPriority() {
        this.todos.sort((a, b) => a.priority - b.priority);
    }
    updateTodoById(id, updates) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
    
        // Only update existing properties (safe update)
        for (const key in updates) {
            if (key in todo) {
                todo[key] = updates[key];
            } else {
                console.warn(`Property "${key}" does not exist on Todo and was ignored.`);
            }
        }
    }

}



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
        for (let j = 0; j < project.todos.length; j++) {
            const todo = project.todos[j];
            console.log(`- ${todo.title} (Due: ${todo.dueDate}, Priority: ${todo.priority})`);
        }
    }
}


export  {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects};
  


const project1 = new Project("Default Project");
const todo1 = new Todo("Buy groceries", "2023-10-01", 2);

projectObjects.push(project1);
const todo2 = new Todo("Clean the house", "2023-10-02", 1);
project1.addTodo(todo2);
project1.addTodo(todo1);
project1.active = true;

