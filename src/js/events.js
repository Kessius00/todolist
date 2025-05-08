
import {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects} from "./classes.js";
import { renderProjects} from "./projects.js";
// import {renderProjects} from "./projects.js";
import {renderTodos} from "./todos.js";

// DOM Elements

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
