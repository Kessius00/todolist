// This file contains the DOM manipulation functions for the projects
// and todos in the application. It includes functions to create, edit, and remove projects,
// as well as to select and activate projects. The file also imports necessary assets and modules.

// Imports
import trashIcon from '../assets/trash.svg';
import editIcon from '../assets/edit.svg';
import {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects} from "./todoList.js";



// DOM Elements
const addProjectBtn = document.querySelector(".add-project-button");
const projects = document.querySelector(".projects");


class DOMProjectElement {
    constructor(ProjectObject) {
        this.title = ProjectObject.title;
        this.todos = ProjectObject.todos;
        this.active = ProjectObject.active;
        this.projectsList = [];
        this.projectItem = this.createProjectElement();
    }
    
    createProjectElement() {
        // create a DOM element for the project

        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");

        // project title
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = this.title;
        projectTitle.classList.add("project-title");
        projectItem.appendChild(projectTitle);

        // right side of the project item
        const rightProject = document.createElement("div");
        rightProject.classList.add("right-project");
        projectItem.appendChild(rightProject);

        // edit icon
        const projectEdit = document.createElement("img");
        projectEdit.src = editIcon;
        projectEdit.alt = "Edit Project";
        projectEdit.classList.add("edit-project");
        rightProject.appendChild(projectEdit);
        
        // trash icon
        const trashBin = document.createElement('img');
        trashBin.src = trashIcon;
        trashBin.alt = "Trash Bin";
        trashBin.classList.add("trash-bin");
        rightProject.appendChild(trashBin);

        // trashBin.addEventListener("click", () => {
        //     removeProject(projectItem);
        // });
        // projectEdit.addEventListener("click", () => {
        //     // Project edit
        //     editProject(projectItem);
        // });
        // projectItem.addEventListener("click", () => {
        //     if (projectItem.classList.contains("active")) {} else{
        //     selectProject(projectItem);}
        // });
        return projectItem;
    }
    setActive() {
        this.active = true;
        this.projectItem = this.createProjectElement();

    }
    setInactive() {
        this.active = false;
        this.projectItem = this.createProjectElement();
    }

    // addTodo(todo) {
    //     if (todo instanceof Todo) {
    //         this.todos.push(todo);
    //     } else {
    //         throw new Error("addTodo expects an instance of Todo");
    //     }
    // }

}

class DOMProjects {
    // This class is used to create a new project
    constructor(projectsDiv) {
        this.projectsDiv = projectsDiv;

    }

    addProjectElement(ProjectObject) {
        // This function adds a new project to the DOM project list
        const newProject = new DOMProjectElement(ProjectObject);
        const projectItem = newProject.createProjectElement();
        this.projectsDiv.appendChild(projectItem);
    }
    removeProject(projectElement) {
        // Remove the project from the project list
        this.projectsDiv.removeChild(projectElement);
    }
    removeAllProjectElements() {
        // Remove all projects from the project list
        while (this.projectsDiv.firstChild) {
            this.projectsDiv.removeChild(this.projectsDiv.firstChild);
        }
    }
    refreshAllProjectElements(projectObjects){
        // Remove all projects from the project list
        // and add the new projects
        this.removeAllProjectElements()
        for (let i = 0; i < projectObjects.length; i++) {
            this.addProjectElement(projectObjects[i]);
        }
    }
    activateProjectElement(projectElement) {
        // This function is called when a project is clicked
        // It sets the clicked project object as active and all others as inactive
        for (let i = 0; i < projectObjects.length; i++) {
            console.log(projectObjects[i])
            projectObjects[i].active = false;
            if (projectObjects[i].title == projectElement.querySelector(".project-title").textContent) {
                projectObjects[i].active = true;
            }
        }
        // Remove the active class from all project-item elements
        projects.querySelectorAll(".project-item").forEach((item) => {
            item.classList.remove("active");
        });
        // Add the active class to the clicked project-item
        projectElement.classList.add("active");
    }

}


const dom_projects = new DOMProjects(projects);

dom_projects.refreshAllProjectElements(projectObjects)

// This function is called when the add project button is clicked




export {DOMProjectElement, DOMProjects, dom_projects};

// This function creates a new project and returns the title (when addnewproject is clicked)
function newProjectSetup(){
    // This function creates a new project and returns the title

    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    let newTitle;

    const input = document.createElement("input");
    input.type = "text";
    input.value = "todolist title";
    input.focus();

    input.addEventListener("blur", () => {
        newTitle = input.value;
        if (input.parentNode) {
            input.remove();
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            newTitle = input.value;
            if (input.parentNode) {
                input.remove();
            }
        }
    });
        }
    });
    input.addEventListener("keyup", (event) => {
        if (event.key === "Escape") {
            input.remove();
            removeProject(projectItem);
        }
    });
    return newTitle


}


// This function is called when the edit button on a project is clicked
function editProject(projectItem){
    // This function is called when the edit button on a project is clicked
    const projectTitle = projectItem.querySelector(".project-title");
    const oldTitleText = projectTitle.textContent;

    projectTitle.textContent = "";
    const input = document.createElement("input");
    input.type = "text";
    input.value = oldTitleText;
    projectItem.appendChild(input);
    input.focus();

    input.addEventListener("blur", () => {
        if (input.parentNode== projectItem) {
            // If the input is still in the project item, update the title
            const newTitle = input.value;
            projectTitle.textContent = newTitle;
            input.remove();
        }
        
    });
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const newTitle = input.value;
            projectTitle.textContent = newTitle;
            input.remove();
        }
    });
    input.addEventListener("keyup", (event) => {
        if (event.key === "Escape") {
            projectTitle.textContent = oldTitleText;
            input.remove();
        }
    });
};


function selectProject(projectItem){

    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((item) => {
        item.classList.remove("active");
    });
    projectItem.classList.add("active");
    activateProject(projectItem)


};




