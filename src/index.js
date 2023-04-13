import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const convex = new ConvexReactClient(process.env.REACT_APP_CONVEX_URL);
root.render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>
);
