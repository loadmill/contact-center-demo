Below is a short README in a clear and straightforward style:

---

# Loadmill Demo: Contact Center Test Automation

This project shows how Loadmill can automate testing for a contact center workflow. It features two views—one for the customer and one for the support agent.

<img width="1440" alt="contact-center" src="https://github.com/user-attachments/assets/81b8c641-af1e-43bb-8e14-40ffa52a13f0" />

## Project Structure

```
project-root/
├── backend/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── CustomerChat.js
│   │   └── SupportAgent.js
│   └── package.json
└── package.json
```

## Setup and Running

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. **Install Dependencies**

   At the project root, run:

   ```bash
   npm install
   ```

   This installs both backend and frontend dependencies.

3. **Start the Servers**

   Use the dev script to run both servers concurrently:

   ```bash
   npm run dev
   ```

   - The backend (Express server) runs on port **3001**.
   - The React development server runs on port **3000** with hot reloading.
   - API calls from the React app are forwarded to the backend using the proxy setting in `frontend/package.json`.

4. **Open the App**

   Open your browser and go to [http://localhost:3000](http://localhost:3000) to use the app.

## Notes

- The backend uses an in-memory queue for messages. For production, consider a persistent storage solution.
- Nodemon is used for the backend to auto-restart on changes.
- The React development server provides live reloading for faster UI development.

---

This README explains the goal, setup, and running instructions in a simple and clear manner.
