
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
