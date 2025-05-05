import { Todo, TodoList } from "./todoList.js";
const formContainer = document.querySelector(".form-container");
console.log(formContainer);



function createTodoForm() {
    const form = document.createElement("form");
    form.id = "todo-form";

    const formTitle = document.createElement("h2");
    formTitle.textContent = "Design Todo";
    form.appendChild(formTitle);

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.placeholder = "Title";
    titleInput.required = true;

    const descriptionInput = document.createElement("textarea");
    descriptionInput.name = "description";
    descriptionInput.placeholder = "Description";

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.name = "dueDate";

    const priorityInput = document.createElement("input");
    priorityInput.type = "number";
    priorityInput.name = "priority";
    priorityInput.placeholder = "Priority (1-3)";
    priorityInput.min = 1;
    priorityInput.max = 3;

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "done";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.id = "cancel-form-btn";
    cancelButton.textContent = "cancel";

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateInput);
    form.appendChild(priorityInput);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);
    return form;
}

function openForm() {
    formContainer.style.display = "block";
}
  
function closeForm() {
    formContainer.style.display = "none";
}





export {createForm, openForm, closeForm};
