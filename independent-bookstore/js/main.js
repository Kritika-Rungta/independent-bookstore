
/* =========================================
   INDEPENDENT BOOKSHOP
   Main Application
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Get interface elements
    const searchInput = document.getElementById("event-search");
    const categoryInput = document.getElementById("event-category");

    const navigationLinks = document.querySelectorAll(
        ".main-nav a, .nav-button, .primary-button"
    );


    // Initialize event loading
    initializeEvents();


    // Search events
    if (searchInput) {

        searchInput.addEventListener("input", () => {
            filterEvents();
        });

        searchInput.addEventListener("change", () => {
            trackInteraction("search_events");
        });

    }


    // Filter events by category
    if (categoryInput) {

        categoryInput.addEventListener("change", () => {

            filterEvents();

            trackInteraction("filter_events");

        });

    }


    // Track navigation interactions
    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            trackInteraction("navigation");

        });

    });


    // Application initialization
    console.log(
        "Independent Bookstore Events Page initialized successfully."
    );

});
