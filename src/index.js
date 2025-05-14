//import styles
import "./styles/reset.css";
import "./styles/styles.scss";

import {renderProjects} from "./js/projects.js";
import {createToDoElement, renderTodos, renderAddTodoBtn} from "./js/todos.js";
import {projectObjects, getProjectObjects, setProjectObjects, Todo, Project} from "./js/classes.js";
import {createProjectObjectsFromStorage, placeInStorage, getStorageList} from "./js/storage.js";

function storageToObjects(){
    const storedList = getStorageList();
    const projectObjects = [];
    storedList.forEach(projectData => {
        const project = new Project(projectData.title);
        project.active = projectData.active;
        project.id = projectData.id;

        // Create todos from the stored data
        project.todos = [];
        projectData.todos.forEach(todoData => {
            const todo = new Todo(todoData.title, todoData.dueDate, todoData.priority);
            todo.completed = todoData.completed;
            todo.id = todoData.id;
            todo.project = project; // Set the project for the todo
            project.addTodo(todo);
        });

        // Add the project to the projectObjects array
        projectObjects.push(project);
    });
    return projectObjects;
}


document.addEventListener("DOMContentLoaded", () => {
    // setProjectObjects(localStorage.getItem("projects")); // ⬅️ load saved data
    // console.log("STORAGE PRE RENDER PROJECTS", localStorage);
    console.log("STORAGE PRE RENDER PROJECTS", getStorageList());
    console.log("STORAGE AFTERCLONING RENDER PROJECTS", storageToObjects());
    // projectObjects = createProjectObjectsFromStorage(); // ⬅️ load saved data


    setProjectObjects(storageToObjects()); // ⬅️ load saved data


    renderProjects(); // ⬅️ render projects
    renderTodos(); // ⬅️ render todos
    renderAddTodoBtn(); // ⬅️ render add todo button
    // console.log("STORAGE POST RENDER PROJECTS", localStorage);

});
