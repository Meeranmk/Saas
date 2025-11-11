
# Subscription Management Dashboard

This project is a solution to the Full Stack Web Developer technical assessment. It's a mini SaaS admin dashboard that allows users to subscribe to plans, view their active subscription, and manage their profile. It features a clean, responsive, and modern UI with both dark and light modes.

Admins have a dedicated view to see a list of all user subscriptions.

## Tech Stack

### Frontend (`/client`)

*   **Framework:** React.js (via Vite)
*   **Language:** TypeScript
*   **Styling:** TailwindCSS
*   **State Management:** Zustand
*   **Routing:** React Router
*   **API:** A mock API is included in `src/lib/api.ts` to simulate backend interactions without needing a live server.

### Backend (`/server`)

*(As per the assessment, the backend is specified but not implemented in this submission. The `/server` directory is included as a placeholder.)*

*   **Framework:** Node.js + Express.js
*   **Authentication:** JWT + Refresh Tokens
*   **Database:** PostgreSQL / MongoDB

## Project Structure

The repository is a monorepo containing both the frontend and a placeholder for the backend.

```
/
├── client/         # Contains the entire React frontend application.
└── server/         # Placeholder for the Node.js backend.
```

## Features Implemented

*   **Authentication:** User registration and login flows.
*   **Role-Based Access:** Separate views and protected routes for regular users and admins.
*   **Subscription Management:**
    *   Users can view and subscribe to different plans.
    *   A dashboard shows the current active subscription status.
*   **Admin Dashboard:** A view for admins to see all subscriptions in the system.
*   **Responsive UI:** The layout is fully responsive and works on all screen sizes.
*   **Dark/Light Mode:** A theme toggle allows users to switch between dark and light themes, with their preference saved in local storage.

## Setup and Run Instructions

To get the frontend application running on your local machine, please follow these steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/subscription-dashboard-task.git
    cd subscription-dashboard-task
    ```

2.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

3.  **Install dependencies:**
    You'll need Node.js and npm (or another package manager) installed.
    ```bash
    npm install
    ```

4.  **Run the development server:**
    This command starts the Vite development server.
    ```bash
    npm run dev
    ```

5.  **Open the application:**
    Open your web browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

## Author

*   **Name:** Meeran
*   **Contact:** meerandeen25@gmail.com

