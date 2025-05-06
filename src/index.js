//import styles
import "./styles/reset.css";
import "./styles/styles.scss";


import {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects} from "./js/todoList.js";
import {DOMProjectElement, DOMProjects} from "./js/DOMprojectsAPI.js";
import {title_event} from "./js/eventListeners.js";

const projects = document.querySelector(".projects");
const projectItems = document.querySelectorAll(".project-item");
const projectTitles = document.querySelectorAll(".project-title");
