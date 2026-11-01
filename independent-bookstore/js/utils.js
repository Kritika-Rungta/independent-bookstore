
/* =========================================
   INDEPENDENT BOOKSHOP
   Utility Functions
========================================= */

/**
 * Safely converts user-provided text into
 * plain text before storing or displaying it.
 */
function sanitizeText(value) {
    const temp = document.createElement("div");
    temp.textContent = String(value ?? "");
    return temp.textContent.trim();
}

/**
 * Logs simulated analytics activity.
 */
function trackInteraction(action) {
    console.log(
        `[Analytics] User interacted with Independent Bookstore Events Page`,
        {
            action: action,
            timestamp: new Date().toISOString()
        }
    );
}

/**
 * Formats a date into a readable format.
 */
function formatDate(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);
}

/**
 * Displays a notification message.
 */
function showToast(message) {
    let container = document.querySelector(".toast-container");

    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        container.setAttribute("aria-live", "polite");
        container.setAttribute("aria-atomic", "true");
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    window.setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Generates a unique event identifier.
 */
function generateEventId() {
    if (window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
