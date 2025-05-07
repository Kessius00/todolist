
import trashIcon from "../assets/trash.svg";
import {projectObjects} from "./classes.js";
import renderProjects from "./events.js";
import {renderTodos} from "./todos.js";


const trash = document.createElement("img");
trash.src = trashIcon;
trash.alt = "Trash Bin";
trash.classList.add("trash-bin");

const projItem = document.querySelector(".project-item");

projItem.appendChild(trash);
const hi = () => {  console.log("hi")};

export {hi};

trash.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the deletedProject
    if (confirm("Are you sure you want to delete this project?")) {
        const deletedProject = e.target.closest(".project-item");
        if (deletedProject) {
            // empty projectObjects array
            const index = projectObjects.findIndex(projectObject => projectObject.title === deletedProject.textContent);
            console.log(index);
            if (index !== -1) {
                projectObjects.splice(index, 1);
            } else {
                throw new Error(`project with title ${deletedProject.textContent} not found. Cant delete from projectArray`);
            }
            deletedProject.remove();
            
            if (projectObjects.length > 0) {
                // Next project in line
            } else{
                // No more projects
                renderProjects();
                renderTodos();
                document.querySelector(".current-project-title>h1").textContent = "No projects remaining... (•́︵•̀)";
            }
        }
        
    }
});

