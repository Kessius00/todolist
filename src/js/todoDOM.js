
import trashIcon from '../assets/trash.svg';
const todoItems = document.querySelector(".todo-items");

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


function addToDoInList(title, dueDate, priority){
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");


    const leftToDo = document.createElement("div");
    leftToDo.classList.add("left-todo");
    todoItem.appendChild(leftToDo);

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    leftToDo.appendChild(checkbox);
    checkbox.addEventListener("click", () => {
        removeTodo(todoItem);
    }
    );


    const todoTitle = document.createElement("p");
    todoTitle.textContent = title;
    todoTitle.classList.add("todo-title");
    leftToDo.appendChild(todoTitle);
    todoTitle.addEventListener("click", () => {
        editTodo(todoItem);
    }
    );


    const rightToDo = document.createElement("div");
    rightToDo.classList.add("right-todo");
    todoItem.appendChild(rightToDo);

    const todoDueDate = document.createElement("p");
    todoDueDate.textContent = dueDate;
    todoDueDate.classList.add("todo-due-date");
    rightToDo.appendChild(todoDueDate);
    todoDueDate.addEventListener("click", () => {
        editTodoDate(todoItem);
    });

    todoItem.setAttribute("data-priority", priority);
    checkbox.style.border = `2px solid ${priorityColor(priority)}`;

    const trashBin = document.createElement('img');
    trashBin.src = trashIcon;
    trashBin.alt = "Trash Bin";
    trashBin.classList.add("trash-bin");
    rightToDo.appendChild(trashBin);
    

    todoItems.appendChild(todoItem);

    return todoItem;
}

addToDoInList("Test Todo", "2023-10-01", 3);


function removeTodo(todoItem){
    todoItems.removeChild(todoItem);
}


class editToDo {
    constructor(title, dueDate, priority){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    editTitle(newTitle){
        this.title = newTitle;
    }
    editDueDate(newDueDate){
        this.dueDate = newDueDate;
    }
}
