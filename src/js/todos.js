import trashIcon from '../assets/trash.svg';
import {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects} from "./classes.js";


function createToDoElement(todoObject) {
    // create a DOM element for the todo item
    const todoElement = document.createElement("div");
    
    if (todoObject.completed) {
        todoElement.classList.add("todo-item", "completed");
    } else {
        todoElement.classList.add("todo-item");
    }
    
    const left = document.createElement("div");
    left.classList.add("left-todo");
    todoElement.appendChild(left);

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    checkbox.style.border = "4px solid #4B2C91";
    checkbox.style.backgroundColor = "transparent";
    left.appendChild(checkbox);

    const todoTitle = document.createElement("p");
    todoTitle.textContent = todoObject.title;
    todoTitle.classList.add("todo-title");
    left.appendChild(todoTitle);

    const right = document.createElement("div");
    right.classList.add("right-todo");
    todoElement.appendChild(right);

    const todoDueDate = document.createElement("p");
    todoDueDate.textContent = todoObject.dueDate;
    todoDueDate.classList.add("todo-due-date");
    right.appendChild(todoDueDate);

    todoElement.setAttribute("data-priority", todoObject.priority);
    
    const trashBin = document.createElement("img");
    trashBin.src = trashIcon;
    trashBin.alt = "Trash Bin";
    trashBin.classList.add("trash-bin");
    right.appendChild(trashBin);

    // Add event listeners for the todo Element
    todoElement.addEventListener("click", () => {
        todoElement.classList.toggle("completed");
        todoObject.completed = !todoObject.completed;

        if (todoObject.completed) {
            todoElement.style.textDecoration = "line-through";
        } else {
            todoElement.style.textDecoration = "none";
        }
        
        console.log(todoObject.project);
    });

    trashBin.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the todoElement
        console.log("THE PROJECT --> ",todoObject.project)
        const todoProject = todoObject.project;
        todoProject.removeTodo(todoObject.id); // Remove the todo from the project
        todoElement.remove();
        console.log(`Todo with ID ${todoObject.id} removed`);

    });
    

    return todoElement;
}


function renderTodos() {
    // Function to render all todos in the active project
    console.log("Rendering todos...");
    const todos = document.querySelector(".todos");
    const currentProjectTitle = document.querySelector(".current-project-title>h1");
    
    todos.innerHTML = ""; // Clear existing todos
    
    projectObjects.forEach((project) => {
        // Check if the project is active
        console.log("Project title:", project);
        if (project.active) {
            console.log("Active project found:", project.title);
            currentProjectTitle.textContent = project.title; // Update the current project title

            // If the project is active, render its todos
            project.todos.forEach((todo) => {
                // if (todo.completed) {
                //     todoElement.classList.add("completed");
                // }
                const todoElement = createToDoElement(todo);
                todos.appendChild(todoElement);
            });
        }
    });
}

renderTodos(); // Initial render of todos


export {createToDoElement, renderTodos};

