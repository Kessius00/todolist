//import styles
import "./styles/reset.css";
import "./styles/styles.scss";

import {Todo, Project, setActiveProject, checkActiveProject, consoleLogProjects, projectObjects} from "./js/classes.js";
import {renderEvents} from "./js/events.js";
import {createToDoElement, renderTodos} from "./js/todos.js";
import {hi} from "./js/projects.js";
import {activateAddTodoButton} from "./js/form.js";
renderEvents();
// renderTodos();
// consoleLogProjects();

hi();
