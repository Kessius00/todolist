//import styles
import "./styles/reset.css";
import "./styles/styles.scss";

// add classes
import {Todo,TodoList} from "./js/todoList.js";
// import {addEventListeners} from "./js/eventListeners.js";
// import createForm from "./js/forms.js";



// grabbing elements
const body = document.querySelector("body");



const todoList = new TodoList("Default Todo List");
todoList.addTodo(new Todo("Test Todo", "This is a test todo", "2023-10-01", 1));
todoList.addTodo(new Todo("Test Todo 2", "This is a test todo 2", "2023-10-01", 1));
todoList.addTodo(new Todo("Test Todo 3", "This is a test todo 3", "2023-10-01", 1));

