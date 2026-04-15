import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async"; // <-- import this
import App from "./App.jsx";
import "./index.css";
import * as React from "react";
window.React = React; // make React global for libraries like react-helmet-async

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);