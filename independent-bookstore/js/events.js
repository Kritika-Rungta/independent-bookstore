
/* =========================================
   INDEPENDENT BOOKSHOP
   Event Management & Connectivity
========================================= */

const EVENT_CACHE_KEY = "bookshop_events";

let eventsData = [];

const eventsContainer = document.getElementById("events-container");
const emptyState = document.getElementById("empty-state");
const eventCount = document.getElementById("event-count");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const errorMessage = document.getElementById("error-message");
const retryButton = document.getElementById("retry-button");
const connectionStatus = document.getElementById("connection-status");


/* Category Labels */

function getCategoryLabel(category) {

    const categories = {
        author: "Author Talks",
        "book-club": "Book Clubs",
        workshop: "Workshops",
        community: "Community"
    };

    return categories[category] || "Other Event";
}


/* Event Card */

function createEventCard(event) {

    const article = document.createElement("article");
    article.className = "event-card";

    const content = document.createElement("div");
    content.className = "event-card-content";

    const category = document.createElement("span");
    category.className = "event-category";
    category.textContent = getCategoryLabel(event.category);

    const title = document.createElement("h3");
    title.textContent = event.title;

    const description = document.createElement("p");
    description.className = "event-description";
    description.textContent = event.description;

    const metadata = document.createElement("div");
    metadata.className = "event-meta";

    const date = document.createElement("p");
    date.textContent = `Date: ${formatDate(event.date)}`;

    const time = document.createElement("p");
    time.textContent = `Time: ${event.time}`;

    const location = document.createElement("p");
    location.className = "event-location";
    location.textContent = `Location: ${event.location}`;

    const action = document.createElement("button");
    action.type = "button";
    action.className = "event-action";
    action.textContent = "View event details";

    action.setAttribute(
        "aria-label",
        `View details for ${event.title}`
    );

    action.addEventListener("click", () => {
        trackInteraction("view_event");
        showToast(`Selected: ${event.title}`);
    });

    metadata.append(date, time, location);

    content.append(
        category,
        title,
        description,
        metadata,
        action
    );

    article.appendChild(content);

    return article;
}


/* Render Events */

function renderEvents(events) {

    if (!eventsContainer || !emptyState || !eventCount) {
        console.error("Required event elements are missing.");
        return;
    }

    eventsContainer.replaceChildren();

    eventCount.textContent =
        `${events.length} ${events.length === 1 ? "EVENT" : "EVENTS"}`;

    emptyState.hidden = events.length !== 0;

    const fragment = document.createDocumentFragment();

    events.forEach(event => {
        fragment.appendChild(createEventCard(event));
    });

    eventsContainer.appendChild(fragment);
}


/* Local Storage */

function saveEventsToCache(events) {

    try {
        localStorage.setItem(
            EVENT_CACHE_KEY,
            JSON.stringify(events)
        );

    } catch (error) {
        console.warn("Unable to cache events:", error);
    }
}


function getCachedEvents() {

    try {
        const cached = localStorage.getItem(EVENT_CACHE_KEY);

        if (!cached) {
            return null;
        }

        const parsed = JSON.parse(cached);

        if (!Array.isArray(parsed)) {
            return null;
        }

        return parsed;

    } catch (error) {
        console.warn("Invalid cached event data:", error);
        return null;
    }
}


/* Validate Retrieved Data */

function validateEvents(data) {

    if (!Array.isArray(data)) {
        throw new Error("Invalid event data format.");
    }

    const ids = new Set();

    data.forEach(event => {

        if (
            !event ||
            typeof event.id !== "string" ||
            typeof event.title !== "string" ||
            typeof event.description !== "string" ||
            typeof event.category !== "string" ||
            typeof event.date !== "string" ||
            typeof event.time !== "string" ||
            typeof event.location !== "string"
        ) {
            throw new Error("An event contains invalid fields.");
        }

        if (ids.has(event.id)) {
            throw new Error("Duplicate event identifier.");
        }

        ids.add(event.id);

    });

    return data;
}


/* Loading State */

function setLoading(isLoading) {

    loadingState.hidden = !isLoading;

    if (isLoading) {
        errorState.hidden = true;
        emptyState.hidden = true;
    }
}


/* Error State */

function showError(message) {

    errorState.hidden = false;
    errorMessage.textContent = message;

    eventsContainer.replaceChildren();
    emptyState.hidden = true;
    eventCount.textContent = "0 EVENTS";
}


/* Load Events */

async function initializeEvents() {

    setLoading(true);
    connectionStatus.textContent = "";

    try {

        if (!navigator.onLine) {
            throw new Error("You are currently offline.");
        }

        const response = await fetch("./data/events.json", {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(
                `Server returned status ${response.status}`
            );
        }

        const data = validateEvents(await response.json());

        eventsData = data;

        saveEventsToCache(eventsData);

        errorState.hidden = true;

        renderEvents(eventsData);

        trackInteraction("load_events");

    } catch (error) {

        console.error("Event loading failed:", error);

        const cachedEvents = getCachedEvents();

        if (cachedEvents !== null) {

            try {

                eventsData = validateEvents(cachedEvents);

                renderEvents(eventsData);

                connectionStatus.textContent =
                    "Showing saved events. Live data is unavailable.";

                errorState.hidden = true;

            } catch (cacheError) {

                console.error("Cached data is invalid:", cacheError);

                showError(
                    "Saved event data is invalid. Please try again."
                );

            }

        } else {

            showError(
                "Events could not be loaded. Check your internet connection and try again."
            );

        }

    } finally {

        setLoading(false);

    }
}


/* Search and Category Filtering */

function filterEvents() {

    const searchInput = document.getElementById("event-search");
    const categoryInput = document.getElementById("event-category");

    if (!searchInput || !categoryInput) {
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryInput.value;

    const filteredEvents = eventsData.filter(event => {

        const matchesSearch =
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderEvents(filteredEvents);
}


/* Retry Button */

if (retryButton) {

    retryButton.addEventListener("click", () => {

        trackInteraction("retry_event_loading");

        initializeEvents();

    });

}


/* Connectivity Events */

window.addEventListener("offline", () => {

    connectionStatus.textContent =
        "Internet connection lost. Saved events remain available.";

    trackInteraction("connection_lost");

});


window.addEventListener("online", () => {

    connectionStatus.textContent =
        "Internet connection restored. Refreshing events...";

    initializeEvents();

    trackInteraction("connection_restored");

});
