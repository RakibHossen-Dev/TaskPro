import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import Authprovider from "./pages/providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Authprovider>
  </StrictMode>
);
