import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/style.css";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Toaster position="top-center" />
        <App />
      </Router>
    </Provider>
  </StrictMode>,
);
