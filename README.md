# 庄家管理系统 (Vite + Vue 3 + Cloudflare Pages)

Based on the legacy Betting Management System, upgraded to a modern stack.

## Tech Stack
-   **Frontend**: Vue 3, Pinia (Store), Vue Router, Vite.
-   **Backend**: Cloudflare Pages Functions (Serverless).
-   **Styling**: Native CSS (Ported from legacy).

## Project Structure
-   `src/`: Frontend source code.
    -   `api/`: API client.
    -   `assets/`: Static assets (CSS).
    -   `components/`: Vue components (currently mainly Views).
    -   `router/`: Routing configuration.
    -   `stores/`: Global state (Pinia).
    -   `utils/`: Helper functions and constants.
    -   `views/`: Page views (Analysis, Betting, Settlement).
-   `functions/`: Backend API (Cloudflare Pages Functions).
-   `public/`: Static files.

## Setup & Development

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server** (Frontend + Backend APIs)
    ```bash
    npm run dev:pages
    ```
    This starts the Wrangler proxy on port 8788 (backend) and Vite on port 5173 (frontend). Access the app at `http://localhost:8788`.

3.  **Run Frontend Only** (No API Mocking)
    ```bash
    npm run dev
    ```

## Deployment

This project is configured for **Cloudflare Pages**.

-   **Build Command**: `npm run build`
-   **Build Output Directory**: `dist`
-   **Root Directory**: `/` (current directory)

The `functions/` directory is automatically detected by Cloudflare Pages to provide backend API routes.
