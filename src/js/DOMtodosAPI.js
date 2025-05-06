
import trashIcon from '../assets/trash.svg';
import {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects} from "./todoList.js";





class ToDoElement {
    constructor(TodoObject) {
        this.title = TodoObject.title;
        this.dueDate = TodoObject.dueDate;
        this.priority = TodoObject.priority;
        this.completed = TodoObject.completed || false;
        this.todoElement = this.createToDoElement();
    }

    createToDoElement() {
        // create a DOM element for the todo item
        const todoItem = document.createElement("div");

        if (this.completed) {
            todoItem.classList.add("todo-item", "completed");
        } else {
            todoItem.classList.add("todo-item");
        }

        const leftToDo = document.createElement("div");
        leftToDo.classList.add("left-todo");
        todoItem.appendChild(leftToDo);

        const checkbox = document.createElement("div");
        checkbox.classList.add("checkbox");
        leftToDo.appendChild(checkbox);

        const todoTitle = document.createElement("p");
        todoTitle.textContent = this.title;
        todoTitle.classList.add("todo-title");
        leftToDo.appendChild(todoTitle);

        const rightToDo = document.createElement("div");
        rightToDo.classList.add("right-todo");
        todoItem.appendChild(rightToDo);

        const todoDueDate = document.createElement("p");
        todoDueDate.textContent = this.dueDate;
        todoDueDate.classList.add("todo-due-date");
        rightToDo.appendChild(todoDueDate);

        todoItem.setAttribute("data-priority", this.priority);
        checkbox.style.border = `2px solid ${priorityColor(this.priority)}`;

        const trashBin = document.createElement("img");
        trashBin.src = trashIcon;
        trashBin.alt = "Trash Bin";
        trashBin.classList.add("trash-bin");
        rightToDo.appendChild(trashBin);

        // Add event listeners for the todo Element
        checkbox.addEventListener("click", () => {
            console.log("Checkbox clicked");
            todoItem.classList.toggle("completed");
            this.completed = !this.completed;
            // removeTodo(todoItem);
        });
        todoDueDate.addEventListener("click", () => {
            // Edit due date
            console.log("Edit due date clicked");
            // editTodoDate(todoItem);
        });
        todoTitle.addEventListener("click", () => {
            // Edit title
            console.log("Edit title clicked");
            // editTodo(todoItem);
        });

        return todoItem;
    }
}


class DOMToDos{
    constructor(todoListDiv){
        this.todoListDiv = todoListDiv;
        this.todoList = [];
    }

    addTodoObjectToDOMList(todoObject){
        // Create a new ToDoElement instance and append it to the todoListDiv
        const todoItem = new ToDoElement(todoObject);
        this.todoListDiv.appendChild(todoItem.todoElement);
    }
    removeTodoElementFromDOM(todoElement){
        // Remove the todoElement from the todoListDiv
        this.todoListDiv.removeChild(todoElement);
    }
    emptyToDoList(){
        // This function empties the todoListDiv by removing all child elements
        while (this.todoListDiv.firstChild) {
            this.todoListDiv.removeChild(this.todoListDiv.firstChild);
        }
    }
    renderToDoList(todoObjectArray){
        // This function takes an array of todo objects and renders them in the todoListDiv
        // It creates a new ToDoElement for each todo object and appends it to the todoListDiv
        todoObjectArray.forEach((todoObject) => {
            this.addTodoObjectToDOMList(todoObject);
        });
    }
    refreshToDoList(){
        // This function refreshes the todo list by emptying it and then rendering the current todos
        // from the active project
        this.emptyToDoList();
        this.renderToDoList(this.todoList);
    }

};



export {ToDoElement, DOMToDos};





function priorityColor(priority){
    switch(priority){
        case 1:
            return "red";
        case 2:
            return "orange";
        case 3:
            return "yellow";
        default:
            return "green";
    }
}
