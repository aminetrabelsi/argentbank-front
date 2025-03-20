import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RootStoreProvider } from "/src/store";

import App from "./App.jsx";
import "./css/main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </StrictMode>
);
