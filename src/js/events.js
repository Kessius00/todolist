import {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects} from "./classes.js";
// import {renderProjects} from "./projects.js";

// DOM Elements
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
        

        setActiveProject(newProjectObject, projectObjects); // Set the new project as active

        // Add the new project to the projectObjects array
        projectObjects.push(newProjectObject);


    }

    renderProjects(); // Re-render the projects
});



function renderProjects() {
    const projects = document.querySelector(".projects");
    projects.innerHTML = ""; // Clear existing projects

    projectObjects.forEach((project, index) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project-item");
        projectElement.textContent = project.title;

        // Add click event to set the active project
        projectElement.addEventListener("click", () => {
            setActiveProject(project, projectObjects);
            consoleLogProjects();
        });

        projects.appendChild(projectElement);
    });
}


renderProjects();

export function renderEvents() {console.log("Events rendered");}
export default renderProjects;

console.log(projectObjects)

document.addEventListener("DOMContentLoaded", () => {
    console.log("projectObjects: ", projectObjects);}
);