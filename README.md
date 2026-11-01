# Independent Bookstore Events Page

A responsive, accessible web interface for discovering and browsing upcoming events at an independent bookstore. The project focuses on clean presentation, event discovery, reliable data loading, and graceful handling of connectivity issues.

**Ticket ID:** ENG-18072  
**Epic:** Core Infrastructure Overhaul  
**Priority:** P1 – High  
**Project Type:** Client Deliverable  
**Technology:** HTML5, CSS3, Vanilla JavaScript

---

## Project Overview

The Independent Bookstore Events Page provides a centralized interface through which bookstore visitors and floor staff can explore upcoming literary and community events.

The interface replaces the need to browse manually maintained event information by presenting event details in a structured, searchable format.

The application is designed with a minimal monochromatic visual system, responsive layouts, and accessibility in mind.

## Project Preview

![Independent Bookstore Events Page](independent-bookstore/assets/images)

*Screenshot of the Independent Bookstore Events Page.*

## Features

### 1. Event Listing
- Dynamically displays bookstore events.
- Shows event title, category, description, date, time, and location.
- Uses reusable event cards.
- Displays the total number of matching events.

### 2. Search Functionality
- Search events by title.
- Search by event description.
- Search by event location.
- Updates results as the user types.

### 3. Category Filtering

Events can be filtered by:
- Author Talks
- Book Clubs
- Workshops
- Community Events

Search and category filtering can be used together.

### 4. Loading and Empty States
- Displays a loading indicator during asynchronous data retrieval.
- Provides a clear empty state when no matching events are available.
- Displays an error message when event data cannot be retrieved.

### 5. Data Persistence and Connectivity
- Retrieves event information from a local JSON file.
- Uses browser LocalStorage to cache successfully retrieved event data.
- Displays cached events when network connectivity is unavailable.
- Provides a retry action when loading fails.
- Detects online and offline browser events.

### 6. Accessibility
- Semantic HTML5 elements.
- Accessible form labels.
- Keyboard navigation support.
- Visible focus indicators.
- ARIA attributes for status and error messages.
- Reduced-motion support.

### 7. Analytics Simulation
Primary user interactions generate console-based analytics messages.

Example:

`[Analytics] User interacted with Independent Bookstore Events Page`

---

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Styling and responsive layouts |
| Vanilla JavaScript | Application logic and DOM manipulation |
| JSON | Event data storage format |
| LocalStorage | Browser-side event caching |
| Fetch API | Asynchronous event retrieval |

No frontend framework or external UI framework is required.

## Project Structure

```text
independent-bookstore/
│
├── assets/
│   └── images/
│       └── boostore.png
│
├── css/
│   ├── style.css
│   ├── components.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── events.js
│   ├── utils.js
│   └── validation.js
│
├── data/
│   └── events.json
│
├── index.html
├── README.md
├── PROMPTS.md
└── links.txt
```

## Application Architecture

The application follows a modular Vanilla JavaScript structure.

### HTML Layer
`index.html`

Defines the navigation, hero section, event listing, search controls, category selector, loading state, empty state, error state, and footer.

### CSS Layer

- `style.css` — Global styles, design tokens, typography, and page layout.
- `components.css` — Event cards, buttons, loading indicators, empty states, and notifications.
- `responsive.css` — Tablet and mobile layouts.

### JavaScript Layer

- `main.js` — Application initialization and event listeners.
- `events.js` — Event retrieval, caching, rendering, searching, filtering, and connectivity handling.
- `utils.js` — Shared utility functions, date formatting, notifications, and analytics simulation.
- `validation.js` — Reusable input validation and accessible error-handling functions.

### Data Layer

`data/events.json` contains the event records consumed by the application.

## Getting Started

### Prerequisites

- A modern web browser.
- Visual Studio Code or another code editor.
- VS Code Live Server extension or another local HTTP development server.

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd independent-bookstore
```

Open the project in Visual Studio Code:

```bash
code .
```

### Running Locally

1. Open the project folder in VS Code.
2. Locate `index.html`.
3. Right-click the file.
4. Select **Open with Live Server**.
5. The application will open in your browser.

**Important:** Use a local HTTP server instead of opening the HTML file directly through `file://`, because the application retrieves its event data using the Fetch API.

## Data and Connectivity Handling

Event information is retrieved from:

`data/events.json`

The application uses the Fetch API to retrieve the JSON records asynchronously.

Successfully retrieved records are cached in browser LocalStorage.

If the network request fails, the application attempts to retrieve previously cached records.

If neither the network nor cached data is available, an error state is displayed with a retry option.

## Quality and Testing

The application is designed to handle the following scenarios:

| Test Scenario | Expected Behaviour |
|---|---|
| Successful event loading | Event cards appear |
| Search by title | Matching events appear |
| Search by location | Matching events appear |
| Category filtering | Selected category is displayed |
| No matching events | Empty state appears |
| Slow or failed request | Loading and error states are handled |
| Offline after successful load | Cached events are displayed |
| Network restored | Events are requested again |
| Keyboard navigation | Interactive controls remain accessible |

### Lighthouse Audit

Recorded Lighthouse results:

| Category | Score |
|---|---:|
| Performance | 98 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

*These are recorded audit results and should be reverified against the final deployed version.*

## Browser Compatibility

Designed for modern browsers supporting:

- ES6 JavaScript.
- Fetch API.
- LocalStorage.
- CSS Grid and Flexbox.
- Semantic HTML5.

## Deployment

The project can be deployed using:

- GitHub Pages
- Netlify
- Vercel

For deployment, ensure the HTML, CSS, JavaScript, JSON data, and image assets are included with their original directory structure.

## Project Information

| Field | Details |
|---|---|
| Project | Independent Bookstore Events Page |
| Ticket | ENG-18072 |
| Epic | Core Infrastructure Overhaul |
| Priority | P1 |
| Assignment | Client Deliverable |
| Primary Technologies | HTML5, CSS3, Vanilla JavaScript |

## Repository and Deployment Links

GitHub Repository: Add your repository URL.

Live Application: Add your deployment URL.

---

**Independent Bookstore Events Page**  
A simple and accessible digital experience for bookstore events and community engagement.
