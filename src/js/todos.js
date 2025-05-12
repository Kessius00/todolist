
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

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    checkbox.style.border = "4px solid #4B2C91";
    checkbox.style.backgroundColor = "transparent";

    const todoTitle = document.createElement("p");
    todoTitle.textContent = todoObject.title;
    todoTitle.classList.add("todo-title");

    left.append(checkbox, todoTitle);

    const right = document.createElement("div");
    right.classList.add("right-todo");
    
    todoElement.append(left, right);

    const todoDueDate = document.createElement("p");
    todoDueDate.textContent = todoObject.dueDate;
    todoDueDate.classList.add("todo-due-date");

    todoElement.setAttribute("data-priority", todoObject.priority);
    
    const trashBin = document.createElement("img");
    trashBin.src = trashIcon;
    trashBin.alt = "Trash Bin";
    trashBin.classList.add("trash-bin");

    right.append(trashBin, todoDueDate);

    // Add event listeners for the todo Element
    todoElement.addEventListener("click", () => {
        todoElement.classList.toggle("completed");
        todoObject.completed = !todoObject.completed;
        renderTodos(); // Re-render the todos

        // console.log(todoObject.project);
    });

    trashBin.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the todoElement
        // console.log("THE PROJECT --> ",todoObject.project)
        const todoProject = todoObject.project;
        todoProject.removeTodo(todoObject.id); // Remove the todo from the project
        todoElement.remove();
        renderTodos(); // Re-render the todos
        // console.log(`Todo with ID ${todoObject.id} removed`);

    });
    

    return todoElement;
}


function renderTodos() {
    // Function to render all todos in the active project
    console.log("Rendering todos...");
    const todos = document.querySelector(".todos");
    
    todos.innerHTML = ""; // Clear existing todos
    
    projectObjects.forEach((project) => {
        // Check if the project is active
        if (project.active) {
            // If the project is active, render its todos
            
            let todoscompleted =  project.todos.filter(todo => todo.completed);
            
            console.log("Completed todos: ", todoscompleted);
            let todoswithoutcompleted =  project.todos.filter(todo => !todo.completed);
            todoswithoutcompleted.sort((a, b) => a.priority - b.priority);
            project.todos = todoswithoutcompleted.concat(todoscompleted);

            project.todos.forEach((todo) => {
                const todoElement = createToDoElement(todo);
                todos.appendChild(todoElement);
            });
            console.log(project.todos);
            
        }
    });

}

// renderTodos(); // Initial render of todos


export {createToDoElement, renderTodos};

