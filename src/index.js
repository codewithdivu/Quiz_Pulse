import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { AuthProvider } from "./contexts/JWTContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </AuthProvider>
  </React.StrictMode>
);
