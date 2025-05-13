//import styles
import "./styles/reset.css";
import "./styles/styles.scss";

import {renderProjects} from "./js/projects.js";
import {createToDoElement, renderTodos, renderAddTodoBtn} from "./js/todos.js";
import {projectObjects, getProjectObjects, setProjectObjects} from "./js/classes.js";
// import {createProjectObjectsFromStorage, placeInStorage, getStorageList} from "./js/storage.js";




document.addEventListener("DOMContentLoaded", () => {
    // setProjectObjects(localStorage.getItem("projects")); // ⬅️ load saved data
    // const projectObjects = createProjectObjectsFromStorage(); // ⬅️ load saved data

    renderProjects(); // ⬅️ render projects
    renderTodos(); // ⬅️ render todos
    renderAddTodoBtn(); // ⬅️ render add todo button
    // console.log("STORAGE POST RENDER PROJECTS", localStorage);

});
