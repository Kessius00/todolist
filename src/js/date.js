import { formatDistance } from "date-fns";

export function createDateElement(inputData) {
    const dateElement = document.createElement("div");
    dateElement.classList.add("date-element");

    // Defensive fallback
    if (!inputData) {
        dateElement.textContent = "No due date";
        return dateElement;
    }

    const inputDate = new Date(inputData);
    const todayDate = new Date();

    if (isNaN(inputDate.getTime())) {
        dateElement.textContent = "Invalid date";
    } else {
        const formattedDate = formatDistance(inputDate, todayDate, { addSuffix: true });
        dateElement.textContent = formattedDate;
    }

    return dateElement;
}

