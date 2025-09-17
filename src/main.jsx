import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DetailsProvider } from "./UseDetails.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <DetailsProvider>
      <App />
    </DetailsProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
