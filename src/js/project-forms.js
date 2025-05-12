
export function createDeletionForm(deletedElement, onConfirm) {
    const deleteTitle = document.querySelector(".delete-project-title");
    const deleteProjectContainer = document.querySelector(".delete-project-container");
    const form = document.querySelector("#delete-project-form");
    const cancelButton = document.querySelector("button.cancel-delete-project-button");

    deleteTitle.textContent = `Are you sure you want to delete the project "${deletedElement.textContent}"?`;
    deleteProjectContainer.classList.remove("hidden");

    const handleCancel = () => {
        removeDeletionForm();
        cleanupEventListeners();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            removeDeletionForm();
            cleanupEventListeners();
        } else if (event.key === "Enter") {
            confirmAndClose();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        confirmAndClose();
    };

    function confirmAndClose() {
        removeDeletionForm();
        cleanupEventListeners();
        onConfirm(); // ✅ call the callback
    }

    cancelButton.addEventListener("click", handleCancel, { once: true });
    document.addEventListener("keydown", handleKeyDown, { once: true });
    form.addEventListener("submit", handleSubmit, { once: true });

    function cleanupEventListeners() {
        document.removeEventListener("keydown", handleKeyDown);
    }
}


function removeDeletionForm() {
    const form = document.querySelector("#delete-project-form");
    const deleteProjectContainer = document.querySelector(".delete-project-container");
    const deleteTitle = document.querySelector(".delete-project-title");

    deleteTitle.textContent = "";
    deleteProjectContainer.classList.add("hidden");
    form.reset();
}



// Project Form

export function createProjectForm(titleScrape) {
    const formContainer = document.querySelector(".project-form-container");
    const form = document.querySelector("#project-form");
    const titleInput = document.querySelector("#project-title-input");
    const cancelButton = document.querySelector("button.cancel-project-title");
    // const submitButton = document.querySelector("button.submit-project-title");

    formContainer.classList.remove("hidden");

    titleInput.focus();
    titleInput.select();

    const handleCancel = () => {
        removeProjectForm();
        cleanupEventListeners();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            removeProjectForm();
            cleanupEventListeners();
        } else if (event.key === "Enter") {
            getTitle();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getTitle();
    };

    function getTitle() { 
        titleScrape();// ✅ call the callback
        removeProjectForm();
        cleanupEventListeners();
    }

    cancelButton.addEventListener("click", handleCancel, { once: true });
    document.addEventListener("keydown", handleKeyDown, { once: true });
    form.addEventListener("submit", handleSubmit, { once: true });
    
    function cleanupEventListeners() {
        document.removeEventListener("keydown", handleKeyDown);
    }
}

function removeProjectForm() {
    const formContainer = document.querySelector(".project-form-container");
    const titleInput = document.querySelector("#project-title-input");
    const form = document.querySelector("#project-form");

    formContainer.classList.add("hidden");
    titleInput.value = "";
    form.reset();
}