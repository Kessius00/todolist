
import trashIcon from "../assets/trash.svg";
import {projectObjects, Project ,setActiveProject} from "./classes.js";
// import renderProjects from "./events.js";
import {renderTodos} from "./todos.js";


export function renderAddProjectBtn(){
    const addProjectBtn = document.querySelector(".add-project-button");


    addProjectBtn.addEventListener("click", () => {
        const projectName = prompt("Enter project name:");

        // Check if the project name already exists
        const projectExists = projectObjects.some(project => project.title === projectName);
        if (projectExists) {
            alert("Project name already exists. Please choose a different name.");
            return;
        }    

        // Check if the user entered a project name
        if (projectName) {
            const newProjectObject = new Project(projectName);

            // Add the new project to the projectObjects array
            projectObjects.push(newProjectObject);

            // Set the new project as active
            setActiveProject(newProjectObject, projectObjects); 

        }

        // Render the new page
        renderProjects(); // Re-render the projects
        renderTodos(); // Re-render the todos

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

    // Check if the project is active
    if (projectObject.active) {
        // Give the project element an active class
        updateActiveProjectClass(projectElement);
    }

    projectElement.addEventListener("click", () => {
        setActiveProject(projectObject, projectObjects);
        updateActiveProjectClass(projectElement);
        renderProjects(); // Re-render the projects
        renderTodos(); // Re-render the todos for the active project
    });


    // Add event listener for the trash icon to delete the project
    trash.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the deletedElement
        if (confirm("Are you sure you want to delete this project?")) {
            const deletedElement = e.target.closest(".project-item");
            if (deletedElement) {
                // empty projectObjects array
                const index = projectObjects.findIndex(projectObject => projectObject.title === deletedElement.textContent);
                if (index !== -1) {
                    projectObjects.splice(index, 1);
                } else {
                    throw new Error(`project with title ${deletedElement.textContent} not found. Cant delete from projectArray`);
                }
                deletedElement.remove();
                
                if (projectObjects.length > 0) {
                    // Next project in line
                    let nextProject;
                    if (index === 0) {
                        nextProject = projectObjects[index];
                    } else {
                        nextProject = projectObjects[index - 1];
                    }

                    setActiveProject(nextProject, projectObjects);
                    const newActiveElement = searchProjectElementByTitle(nextProject.title);

                    updateActiveProjectClass(newActiveElement);
                    renderProjects();
                    renderTodos(); // Re-render the todos for the active project

    
                } else{
                    // No more projects
                    renderProjects();
                    renderTodos();
                    document.querySelector(".current-project-title>h1").textContent = "No projects remaining... (•́︵•̀)";
                }
            }
            
        }
    });

    return projectElement;
}

function searchProjectElementByTitle(title) {
    // Search for a project element by its title
    const projectElement = Array.from(document.querySelectorAll(".project-item")).find(
        (element) => element.textContent === title
    );
    return projectElement;
}

function renderProjects() {
    const projects = document.querySelector(".projects");
    projects.innerHTML = ""; // Clear existing projects

    projectObjects.forEach((project, index) => {
        const projectElement = createProjectElement(project); // Create a project element

        if (project.active) {    // Update the current project title
            const currentProjectTitle = document.querySelector(".current-project-title>h1");
            currentProjectTitle.textContent = project.title; // Update the current project title
        
            // Add active-project class to the project element
            updateActiveProjectClass(projectElement);
        
            // Re-render the todos for the active project
            renderTodos(); //has its own active project checker 
        }

        // Add element to the DOM
        projects.appendChild(projectElement);

    });

}


export {renderProjects};



