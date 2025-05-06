// import { addProject } from "./oldFiles/staticDOM.js";
import {DOMProjectElement, DOMProjects, dom_projects} from "./DOMprojectsAPI.js";


const projects = document.querySelector(".projects");
const proj = new DOMProjects(projects);

function title_event(){
    const projectTitles = document.querySelectorAll(".project-item");
    projectTitles.forEach((title) => {
        title.addEventListener("click", (event) => {
            // cancel event if it hovered over the title
            if (event.target.classList.contains("trash-bin")) {
                event.stopPropagation();
                return;
            }
            const projectItem = event.target.closest(".project-item");
            proj.activateProjectElement(projectItem);
            
        });
    });
};

title_event();
// console.log(projectTitles);

export {title_event};





// const todoColumn = document.querySelector(".todo-column");


// const showTodoFormBtn = document.createElement("button");
// showTodoFormBtn.id = "show-form-btn";
// showTodoFormBtn.textContent = "+ Add Todo";
// todoColumn.appendChild(showTodoFormBtn);

// const addProjectBtn = document.querySelector(".add-project-button");
// addProjectBtn.addEventListener("click", () => {
//     // In the DOM
//     const projectTitle = newProjectSetup();
//     const projectItem = projectConstructorDOM(projectTitle);
//     addProject(projectItem);

//     const projectInstance = new Project(projectTitle);
//     projectObjects.push(projectInstance);
//     activateProject(projectItem);

    
// });



