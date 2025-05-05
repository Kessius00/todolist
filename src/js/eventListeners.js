const todoColumn = document.querySelector(".todo-column");


const showTodoFormBtn = document.createElement("button");
showTodoFormBtn.id = "show-form-btn";
showTodoFormBtn.textContent = "+ Add Todo";
todoColumn.appendChild(showTodoFormBtn);


showTodoFormBtn.addEventListener("click", () => {
    console.log("show form");
})


