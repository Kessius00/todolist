import { Todo, projectObjects, checkActiveProject} from './classes.js'; // Import the Todo class
import {renderTodos} from './todos.js'; // Import the renderTodos function


const form = document.getElementById('todo-form');


const addTodoButton = document.querySelector('button.add-todo');
// console.log("Add Todo Button: ", addTodoButton);
function activateAddTodoButton() {

    const formContainer = document.querySelector('.todo-form-container');
    const addTodoButton = document.querySelector('button.add-todo');

    const cancelButton = document.querySelector('button.cancel-button');
    const submitButton = document.querySelector('button.submit-button');

    cancelButton.addEventListener('click', () => {
        removeForm();
    }
    );

    // if escape key is pressed, remove the form
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            removeForm();
        }
    });

    // if the form is submitted, remove the form
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const dueDate = document.getElementById('dueDate').value;
        const priority = parseInt(document.getElementById('priority').value);

        const newTodo = new Todo(title, dueDate, priority);
        // Find the active project
        const activeProject = checkActiveProject(projectObjects);
        if (activeProject) {
            activeProject.addTodo(newTodo); // Add the new todo to the active project
        }
        // console.log("New Todo: ", newTodo);
        // console.log("Active Project: ", activeProject);

        // Render the todos in the active project
        renderTodos();
        // Clear the form fields
        removeForm();

        
    });

    addTodoButton.addEventListener('click', () => {
        formContainer.classList.toggle('hidden'); // Toggle the visibility of the form container
    });
}

function removeForm(){
    const formContainer = document.querySelector('.todo-form-container');
    formContainer.classList.add('hidden'); // Hide the form container
    form.reset(); // Reset the form fields
}

activateAddTodoButton();

export {activateAddTodoButton};



