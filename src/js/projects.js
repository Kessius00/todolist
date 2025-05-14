
import trashIcon from "../assets/trash.svg";
import {projectObjects, Project ,setActiveProject, getProjectObjects} from "./classes.js";
import {renderTodos} from "./todos.js";
import { createDeletionForm, createProjectForm } from "./project-forms.js";
import { placeInStorage} from "./storage.js";


function renderAddProjectBtn(){
    const addProjectBtn = document.querySelector(".add-project-button");

    addProjectBtn.addEventListener("click", () => {
        createProjectForm(() => {
            const titleInput = document.querySelector("#project-title-input");
            const projectName = titleInput.value;

            // Check if the project name already exists
            const projectExists = projectObjects.some(project => project.title === projectName);
            if (projectExists) {
                alert("Project name already exists. Please choose a different name.");
                return;
            }    

            // Check if the user entered a project name
            if (projectName) {
                const newProjectObject = new Project(projectName);

                // Set the new project as active
                newProjectObject.active = true;
                // Set the active project in the projectObjects array
                
                // Add the new project to the projectObjects array
                addProject(newProjectObject); // Add the new project to the DOM

                // Re-render the projects
                renderProjects(); // Re-render the projects
                renderTodos(); // Re-render the todos for the active project

            }
        });
    });
}

function updateActiveProjectClass(projectElement){
        // Remove active class from other projects
        const allProjectElements = document.querySelectorAll(".project-item");
        allProjectElements.forEach((project) => {
            project.classList.remove("active-project");
        });
        
        // Add active class to projectElement
        projectElement.classList.add("active-project");
        
    }


function createProjectElement(projectObject) {
    // create a DOM element for the project item
    const projectElement = document.createElement("div");
    projectElement.classList.add("project-item");
    projectElement.textContent = projectObject.title;

    // Create a trash icon for deleting the project
    const trash = document.createElement("img");
    trash.src = trashIcon;
    trash.alt = "Trash Bin";
    trash.classList.add("trash-bin");
    projectElement.appendChild(trash);

    function searchProjectElementByTitle(title) {
        // Search for a project element by its title
        const projectElement = Array.from(document.querySelectorAll(".project-item")).find(
            (element) => element.textContent === title
        );
        return projectElement;
    }

    // Check if the project is active
    if (projectObject.active) {
        // Give the project element an active class
        updateActiveProjectClass(projectElement);
    }

    projectElement.addEventListener("click", () => {
        setActiveProject(projectObject, projectObjects);
        updateActiveProjectClass(projectElement);
        placeInStorage(getProjectObjects());
        renderProjects(); // Re-render the projects
        renderTodos(); // Re-render the todos for the active project
    });

    trash.addEventListener("click", (e) => {
        e.stopPropagation();
        // const deletedElement = e.target.closest(".project-item");
        // console.log("Deleted element:", projectElement);

        createDeletionForm(projectElement, () => {
            // Everything in here only runs after user confirms deletion
            const index = removeProject(projectElement);
            projectElement.remove();

            if (projectObjects.length > 0) {
                // set next project as the project above the deleted one

                // choosing the next project
                let nextProject = (index === 0) ? projectObjects[0] : projectObjects[index - 1];

                setActiveProject(nextProject, projectObjects);
                // update the active project class
                const newActiveElement = searchProjectElementByTitle(nextProject.title);
                updateActiveProjectClass(newActiveElement);

                // Re-render the projects and todos
                renderProjects();
                renderTodos();
            } else {
                renderProjects();
                renderTodos();
                document.querySelector(".current-project-title>h1").textContent = "No projects remaining... (•́︵•̀)";
            }

            placeInStorage(getProjectObjects());
        });
    });
    
    return projectElement;
}

export function addProject(newProject) {
    projectObjects.push(newProject);
    placeInStorage(projectObjects); 
    renderTodos();
    console.log("LocalStorage after adding project:", localStorage.getItem("projects"));
}

export function removeProject(projectElement){
    // Remove the project from the projectObjects array
    const index = projectObjects.findIndex(project => project.title === projectElement.textContent);
    if (index !== -1) {
        projectObjects.splice(index, 1);
    } else {
        throw new Error(`Project with title ${projectElement.textContent} not found.`);
    }
    // placeInStorage(projectObjects); 
    return index;

}


function renderProjects() {
    const projects = document.querySelector(".projects");
    projects.innerHTML = ""; // Clear existing projects
    renderAddProjectBtn();


    getProjectObjects().forEach((project) => {
        const projectElement = createProjectElement(project); // Create a project element

        if (project.active) {    // Update the current project title
            const currentProjectTitle = document.querySelector(".current-project-title>h1");
            currentProjectTitle.textContent = project.title; // Update the current project title
        
            // Add active-project class to the project element
            updateActiveProjectClass(projectElement);
            setActiveProject(project, projectObjects);

        
            // Re-render the todos for the active project
            renderTodos(); //has its own active project checker 

        }

        // Add element to the DOM
        projects.appendChild(projectElement);

    });

}


export {renderProjects,renderAddProjectBtn};



