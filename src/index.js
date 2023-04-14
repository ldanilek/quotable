import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const root = ReactDOM.createRoot(document.getElementById("root"));

const convex = new ConvexReactClient(process.env.REACT_APP_CONVEX_URL, {
  verbose: true,
});
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey="pk_test_d29uZHJvdXMtY2F0ZmlzaC03Ny5jbGVyay5hY2NvdW50cy5kZXYk">
      <ConvexProviderWithClerk client={convex}>
        <App />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>
);
