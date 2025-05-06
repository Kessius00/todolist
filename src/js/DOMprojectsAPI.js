// This file contains the DOM manipulation functions for the projects
// and todos in the application. It includes functions to create, edit, and remove projects,
// as well as to select and activate projects. The file also imports necessary assets and modules.

// Imports
import trashIcon from '../assets/trash.svg';
import editIcon from '../assets/edit.svg';
import {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects} from "./todoList.js";
import {ToDoElement, DOMToDos} from "./DOMtodosAPI.js";

// DOM Elements
const projects = document.querySelector(".projects");
const todoItemsDOM = document.querySelector(".todo-items");
class DOMProjectElement {
    constructor(ProjectObject) {
        this.id = ProjectObject.id;
        this.title = ProjectObject.title;
        this.todos = ProjectObject.todos;
        this.active = ProjectObject.active;

        this.projectItem = this.createProjectElement();
    }

    createTitleElement() {
        const title = document.createElement("h2");
        title.textContent = this.title;
        title.classList.add("project-title");
        return title;
    }

    createIcon(src, alt, className, handler) {
        const icon = document.createElement("img");
        icon.src = src;
        icon.alt = alt;
        icon.classList.add(className);
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            handler();
        });
        return icon;
    }

    createProjectElement() {
        const item = document.createElement("div");
        item.classList.add("project-item");
        item.dataset.projectId = this.id; // Store project ID in data attribute

        const title = this.createTitleElement();
        item.appendChild(title);

        const right = document.createElement("div");
        right.classList.add("right-project");

        const editBtn = this.createIcon(editIcon, "Edit Project", "edit-project", () => this.editMode());
        const trashBtn = this.createIcon(trashIcon, "Trash Bin", "trash-bin", () => {
            // handle deletion
            console.log("Project deleted:", this.title);
        });

        right.append(editBtn, trashBtn);
        item.appendChild(right);

        item.addEventListener("click", () => {
            // handle activation logic
            console.log("Project clicked:", this.title);
        });

        return item;
    }
    editMode() {
        const newTitle = prompt("Enter new project name:", this.title);
        if (newTitle) {
            this.saveEdit(newTitle);
        }
    }
    

    saveEdit(newTitle) {
        this.title = newTitle;
        console.log("Project title changed to:", this.title);

        const newItem = this.createProjectElement();
        // this.projectItem.replaceWith(newItem);
        this.projectItem = newItem;
        consoleLogProjects();
    }

    render(parentElement) {
        parentElement.appendChild(this.projectItem);
    }
}


const projectData = new Project("Project 1", [
    new Todo("Todo 1", "2023-10-01", 2),
    new Todo("Todo 2", "2023-10-02", 1),
    new Todo("Todo 3", "2023-10-03", 3),
    new Todo("Todo 4", "2023-10-04", 1),
    new Todo("Todo 5", "2023-10-05", 2),
    new Todo("Todo 6", "2023-10-06", 3)
]);
const projectData2 = new Project("Project 2", [
    new Todo("Todo 7", "2023-10-07", 4),
    new Todo("Todo 8", "2023-10-08", 5),
    new Todo("Todo 9", "2023-10-09", 6)
]);

const projectElement = new DOMProjectElement(projectData);
const projectElement2 = new DOMProjectElement(projectData2);


projectElement.render(projects);
projectElement2.render(projects);




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
        this.activateProjectElement(projectItem);
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

        const projectTitle = projectElement.querySelector(".project-title").textContent;
        
        for (let i = 0; i < projectObjects.length; i++) {

            // set all projects to inactive
            projectObjects[i].active = false;
            if (projectObjects[i].title == projectTitle) {
                // set the clicked project to active
                projectObjects[i].active = true;
                
                // refresh the todo list
                const activeTodosObjectList = projectObjects[i].todos;
                const activeTodoObjectList = new DOMToDos(todoItemsDOM);
                activeTodoObjectList.todoList = activeTodosObjectList;
                activeTodoObjectList.refreshToDoList();
                
            }
        }
        
        // Remove the active class from all project-item elements
        this.projectsDiv.querySelectorAll(".project-item").forEach((item) => {
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



