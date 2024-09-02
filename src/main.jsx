import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { NotesProvider } from "./contexts/NotesContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <NotesProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </NotesProvider>
  </AuthProvider>
);
