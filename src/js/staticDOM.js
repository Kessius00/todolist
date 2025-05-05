// Removed unused 'add' import
import trashIcon from '../assets/trash.svg';
import editIcon from '../assets/edit.svg';
import {Project} from "./todoList.js";

const projects = document.querySelector(".projects");
const projectObjects = [];



// This function returns a project element
function projectConstructorDOM(title){
    // This function returns a project element
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    projectItem.addEventListener("click", () => {
        if (projectItem.classList.contains("active")) {} else{
        selectProject(projectItem);}
    });

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = title;
    projectTitle.classList.add("project-title");
    projectItem.appendChild(projectTitle);


    const rightProject = document.createElement("div");
    rightProject.classList.add("right-project");
    projectItem.appendChild(rightProject);

    const projectEdit = document.createElement("img");
    projectEdit.src = editIcon;
    projectEdit.alt = "Edit Project";
    projectEdit.classList.add("edit-project");
    rightProject.appendChild(projectEdit);


    projectEdit.addEventListener("click", () => {
        // Project edit
        editProject(projectItem);
    });

    const trashBin = document.createElement('img');
    trashBin.src = trashIcon;
    trashBin.alt = "Trash Bin";
    trashBin.classList.add("trash-bin");
    rightProject.appendChild(trashBin);
    trashBin.addEventListener("click", () => {
        removeProject(projectItem);
    });
    return projectItem;
}

// Append the project-element to DOM in projects-list
function addProject(projectObject){
    // Append the project-element to DOM in projects-list
    const projectItem = projectConstructorDOM(projectObject.title);
    projects.appendChild(projectItem);   
}

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

addProject("Default Project");
addProject("Default #2 Project");

function removeProject(projectItem){
    // Remove the project from the project list
    projects.removeChild(projectItem);
}

export {addProject};
// ----------------------------------------------------------------

const addProjectBtn = document.querySelector(".add-project-button");
addProjectBtn.addEventListener("click", () => {
    // In the DOM
    const projectTitle = newProjectSetup();
    const projectItem = projectConstructorDOM(projectTitle);
    addProject(projectItem);

    const projectInstance = new Project(projectTitle);
    projectObjects.push(projectInstance);
    activateProject(projectItem);

    
});


function activateProject(projectItem){
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((item) => {
        item.classList.remove("active");
    });
    projectItem.classList.add("active");
    objectActivation(projectItem);
    console.log(projectObjects)
}

projectObjects.push(new Project("Default Project"));
projectObjects.push(new Project("Default #2 Project"));
projectObjects[0].active = true;

function objectActivation(projectItem){
    // This function is called when a project is clicked
    // It sets the clicked project object as active and all others as inactive

    for (let i = 0; i < projectObjects.length; i++) {
        projectObjects[i].setInactive();
        if (projectObjects[i].title == projectItem.querySelector(".project-title").textContent){
            projectObjects[i].setActive;
            console.log(projectObjects);
        }
    }
}
