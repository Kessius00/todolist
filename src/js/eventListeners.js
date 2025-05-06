// import { addProject } from "./oldFiles/staticDOM.js";
import {DOMProjectElement, DOMProjects} from "./DOMprojectsAPI.js";
import {ToDoElement, DOMToDos} from "./DOMtodosAPI.js";
import {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects} from "./todoList.js";


// DOM Elements
const addProjectBtn = document.querySelector(".add-project-button");
const projects = document.querySelector(".projects");
const dom_project = new DOMProjects(projects);

addProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
        const newProjectObject = new Project(projectName);
        projectObjects.push(newProjectObject);
        console.log(projectObjects);

        const projectElementDOM = new DOMProjectElement(newProjectObject);
        // projectElementDOM.setActive();
        dom_project.refreshAllProjectElements(projectObjects);
        projectItemClick();
    }
});




function projectItemClick(){
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((projItem) => {
        projItem.addEventListener("click", (event) => {
            // cancel event if it hovered over the title
            if (event.target.classList.contains("trash-bin")) {
                event.stopPropagation();
                return;
            }
            const projectItem = event.target.closest(".project-item");
            dom_project.activateProjectElement(projectItem);
            
        });
    });
};


dom_project.activateProjectElement(dom_project.projectsDiv.firstChild);
projectItemClick();
// console.log(projectTitles);

export {projectItemClick };

