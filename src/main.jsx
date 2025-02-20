import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import Authprovider from "./pages/providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Authprovider>
    </QueryClientProvider>
  </StrictMode>
);
