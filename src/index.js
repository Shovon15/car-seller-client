import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardContextProvider } from "./context/DashboardContext";
import ScrollPositionProvider from "./context/ScrollPosition";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ScrollPositionProvider>
        <AuthProvider>
          <DashboardContextProvider>
            <App />
          </DashboardContextProvider>
        </AuthProvider>
      </ScrollPositionProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
