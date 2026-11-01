
/* =========================================
   INDEPENDENT BOOKSHOP
   Form Validation
========================================= */

/**
 * Checks whether a value is empty.
 */
function isRequired(value) {
    return String(value ?? "").trim().length > 0;
}

/**
 * Validates an event title.
 */
function validateEventTitle(value) {

    if (!isRequired(value)) {
        return "Event title is required.";
    }

    if (value.trim().length < 3) {
        return "Event title must contain at least 3 characters.";
    }

    if (value.trim().length > 100) {
        return "Event title cannot exceed 100 characters.";
    }

    return "";
}

/**
 * Validates an event description.
 */
function validateEventDescription(value) {

    if (!isRequired(value)) {
        return "Event description is required.";
    }

    if (value.trim().length > 500) {
        return "Description cannot exceed 500 characters.";
    }

    return "";
}

/**
 * Validates event location.
 */
function validateEventLocation(value) {

    if (!isRequired(value)) {
        return "Event location is required.";
    }

    return "";
}

/**
 * Validates an event date.
 */
function validateEventDate(value) {

    if (!isRequired(value)) {
        return "Please select an event date.";
    }

    const selectedDate = new Date(`${value}T00:00:00`);

    if (Number.isNaN(selectedDate.getTime())) {
        return "Please enter a valid date.";
    }

    return "";
}

/**
 * Displays a field error.
 */
function showFieldError(field, message) {

    if (!field) {
        return;
    }

    field.classList.add("field-error");

    field.setAttribute("aria-invalid", "true");

    let errorElement = document.getElementById(
        `${field.id}-error`
    );

    if (!errorElement) {

        errorElement = document.createElement("span");

        errorElement.id = `${field.id}-error`;

        errorElement.className = "error-message";

        errorElement.setAttribute("role", "alert");

        field.insertAdjacentElement(
            "afterend",
            errorElement
        );

    }

    errorElement.textContent = message;

    field.setAttribute(
        "aria-describedby",
        errorElement.id
    );
}

/**
 * Removes a field error.
 */
function clearFieldError(field) {

    if (!field) {
        return;
    }

    field.classList.remove("field-error");

    field.removeAttribute("aria-invalid");

    field.removeAttribute("aria-describedby");

    const errorElement = document.getElementById(
        `${field.id}-error`
    );

    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Validates an individual field.
 */
function validateField(field, validator) {

    const error = validator(field.value);

    if (error) {

        showFieldError(field, error);

        return false;
    }

    clearFieldError(field);

    return true;
}
