// todoUI.js

import trashIcon from '../assets/trash.svg';
import { createDateElement } from './date.js';
import { placeInStorage, createProjectObjectsFromStorage } from './storage.js';

import {
    Todo,
    projectObjects,
    checkActiveProject,
    getProjectObjects,
    setProjectObjects
} from './classes.js';
import { renderProjects } from './projects.js';

export function renderAddTodoBtn() {
    const addTodoButton = document.querySelector('button.add-todo');
    const form = document.getElementById('todo-form');
    const formContainer = document.querySelector('.todo-form-container');
    const cancelButton = document.querySelector('button.cancel-button');

    const removeForm = () => {
        formContainer.classList.add('hidden');
        form.reset();
    };

    const handleSubmit = () => {
        const title = document.getElementById('title').value;
        const dueDate = document.getElementById('dueDate').value;
        const priority = parseInt(document.getElementById('priority').value);

        const newTodo = new Todo(title, dueDate, priority);
        const activeProject = checkActiveProject(getProjectObjects());

        if (activeProject) {
            activeProject.addTodo(newTodo);

            console.log('New Todo:', newTodo);
            console.log('Active Project:', activeProject);
            console.log('Project Objects:', getProjectObjects());

            console.log(getProjectObjects())
            placeInStorage(getProjectObjects());
            // console.log('LocalStorage after adding todo:', createProjectObjectsFromStorage());



            renderTodos();
            renderProjects();
        }
    };

    const submitForm = (event) => {
        console.log("submit triggered from", event.type);
        event.preventDefault();
        handleSubmit();
        removeForm();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            removeForm();
        } 
    };

    // Event listeners
    addTodoButton.addEventListener('click', () => formContainer.classList.remove('hidden'));
    cancelButton.addEventListener('click', removeForm);
    form.addEventListener('submit', submitForm);
    document.addEventListener('keydown', handleKeyDown);
    formContainer.addEventListener('click', (event) => {
        if (event.target === formContainer) removeForm();
    });
}

function createToDoElement(todoObject) {
    const todoElement = document.createElement('div');
    todoElement.classList.add('todo-item');
    if (todoObject.completed) todoElement.classList.add('completed');

    const left = document.createElement('div');
    left.classList.add('left-todo');

    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox');
    checkbox.style.border = '4px solid #4B2C91';
    checkbox.style.backgroundColor = 'transparent';

    const todoTitle = document.createElement('p');
    todoTitle.textContent = todoObject.title;
    todoTitle.classList.add('todo-title');

    left.append(checkbox, todoTitle);

    const right = document.createElement('div');
    right.classList.add('right-todo');

    const trashBin = document.createElement('img');
    trashBin.src = trashIcon;
    trashBin.alt = 'Trash Bin';
    trashBin.classList.add('trash-bin');

    const todoDueDate = createDateElement(todoObject.dueDate);

    right.append(trashBin, todoDueDate);
    todoElement.setAttribute('data-priority', todoObject.priority);
    todoElement.append(left, right);

    // Mark completed toggle
    todoElement.addEventListener('click', () => {
        todoObject.completed = !todoObject.completed;

        placeInStorage(getProjectObjects());
        renderTodos();
    });

    // Delete button handler
    trashBin.addEventListener('click', (e) => {
        e.stopPropagation();
        todoObject.project.removeTodo(todoObject.id);

        placeInStorage(getProjectObjects());
        renderTodos();
    });

    return todoElement;
}


// function buttonOrder(){
//     // everytime active project changes, the order button should be reset to date
//     const orderBtn = document.querySelector('button.toggle-order');
//     const todosContainer = document.querySelector('.todos');
//     const todos = Array.from(todosContainer.children);

//     orderBtn.addEventListener('click', () => {
//         // Sort the todos based on the priority attribute
//         orderBtn.classList.toggle('button-ondate');
//         orderBtn.classList.toggle('button-onpriority');

//         const activeProject = checkActiveProject(getProjectObjects());
//         if (!activeProject) return 0;
//         const todosInProject = activeProject.todos;
//         const completedTodos = todosInProject.filter(todo => todo.completed);
//         const notCompletedTodos = todosInProject.filter(todo => !todo.completed);

//         const sortDateTodosInDom = () => {
//             const sortedTodos = notCompletedTodos.sort((a, b) => {
//                 const dateA = new Date(a.dueDate);
//                 const dateB = new Date(b.dueDate);
//                 return dateA - dateB;
//             }
//             );
//             const sortedTodoOrder = sortedTodos.concat(completedTodos);
//             todosContainer.innerHTML = '';

//             sortedTodoOrder.forEach(todo => {
//                 const todoElement = createToDoElement(todo);
//                 todosContainer.appendChild(todoElement);
//             }
//             );
//         }


//         const sortTodosByPriority = (todos) => {
//             let todoCompleted = [];
//             let todoNotCompleted = [];

//             todos.forEach(todo => {
//                 if (todo.classList.contains('completed')) {
//                     todoCompleted.push(todo);
//                 } else {
//                     todoNotCompleted.push(todo);
//                 }
//             });

//             const sortedTodos = todoNotCompleted.sort((a, b) => {
//                 const priorityA = parseInt(a.getAttribute('data-priority'));
//                 const priorityB = parseInt(b.getAttribute('data-priority'));
//                 return priorityA - priorityB;
//             });

//             sortedTodos = sortedTodos.concat(todoCompleted);
//         }
            

//         if (orderBtn.textContent === 'date') {
//             orderBtn.textContent = 'priority';
//             sortTodosByPriority(todos);
//         } else {
//             orderBtn.textContent = 'date';
//             sortDateTodosInDom();
//         }
//     });
// }

// buttonOrder();

function renderTodos() {
    const todosContainer = document.querySelector('.todos');
    todosContainer.innerHTML = '';

    const activeProject = checkActiveProject(getProjectObjects());
    if (!activeProject) return;

    const todosSorted = [
        ...activeProject.todos.filter(todo => !todo.completed).sort((a, b) => a.priority - b.priority),
        ...activeProject.todos.filter(todo => todo.completed)
    ];

    activeProject.todos = todosSorted;

    todosSorted.forEach(todo => {
        const todoElement = createToDoElement(todo);
        todosContainer.appendChild(todoElement);
    });
}


export { createToDoElement, renderTodos };
