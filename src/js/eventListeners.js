import { addProject } from "./staticDOM.js";

const todoColumn = document.querySelector(".todo-column");

const projectTitles = document.querySelectorAll(".project-title");

const showTodoFormBtn = document.createElement("button");
showTodoFormBtn.id = "show-form-btn";
showTodoFormBtn.textContent = "+ Add Todo";
todoColumn.appendChild(showTodoFormBtn);

const addProjectBtn = document.querySelector(".add-project-btn");
addProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    addProject(projectName);
});



// addProjectBtn.addEventListener("click", () => {
//     const projectName = prompt("Enter project name:");
//     addProject(projectName);
// });





