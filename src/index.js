//import styles
import "./styles/reset.css";
import "./styles/styles.scss";
import {addProject} from "./js/staticDOM.js";
import {Todo, Project} from "./js/todoList.js";
import {addToDoInList} from "./js/todoDOM.js";

// add classes
// import {addEventListeners} from "./js/eventListeners.js";
// import createForm from "./js/forms.js";
const addProjectBtn = document.querySelector(".add-project-button");

// addProjectBtn.addEventListener("click", () => {
//     const projectName = prompt("Enter project name:");
//     addProject(projectName);
// });



// make array with all the projects
const projectList = [];
projectList.push(new Project("Default Project"));
projectList.push(new Project("Default #2 Project"));

projectList[0].active = true;

console.log(projectList);
const projects = document.querySelector(".projects");
const projectItems = document.querySelectorAll(".project-item");
const projectTitles = document.querySelectorAll(".project-title");
