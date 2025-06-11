# Frontend Overview

## 1. Introduction
This frontend project is built using React with Vite as the build tool. Vite provides a fast development environment with Hot Module Replacement (HMR) and supports modern JavaScript features. The project uses ESLint for code quality and follows React best practices.

## 2. Entry Point
The main entry point of the application is `src/main.jsx`. It renders the root React component `App` inside a `BrowserRouter` for client-side routing and `StrictMode` for highlighting potential problems in the application.

```jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

## 3. Routing
Routing is managed in `src/App.jsx` using `react-router-dom`. The app defines public and private routes wrapped by `PublicRoutes` and `PrivateRoutes` components respectively.

- **Public Routes:** Include `/login` and `/register` pages. These routes are accessible only when the user is not authenticated.
- **Private Routes:** Include the root path `/` which currently renders a placeholder home page. These routes require authentication.

The route protection logic is implemented as follows:

- `PublicRoutes.jsx` checks if a user token exists. If authenticated, it redirects to the home page; otherwise, it renders the public routes.
- `PrivateRoutes.jsx` checks for a user token. If authenticated, it renders the private routes wrapped inside a `Layout` component; otherwise, it redirects to the registration page.

## 4. Layout
The `Layout` component (`src/layout/Layout.jsx`) wraps private routes and provides a consistent page structure. It renders a flex container with a `Sidebar` component alongside the main content.

```jsx
<div className="flex">
  <Sidebar />
  {children}
</div>
```

## 5. Sidebar Navigation
The `Sidebar` component (`src/components/Sidebar.jsx`) provides navigation for the private area of the app. Key features include:

- A collapsible sidebar with expand/collapse toggle.
- Menu items: Dashboard, Projects, Calendar, Team, Reports.
- Settings items: Settings, Help.
- User profile section with user name, email, and logout button.
- Uses `react-icons` for icons.
- Tracks the active menu item and highlights it.
- Smooth transition animations for expanding and collapsing.

This sidebar is an integral part of the private layout and helps users navigate through different sections of the app.

---

This document provides an overview of the current frontend workings. For more detailed information, please refer to the source code files.
