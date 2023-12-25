import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-1eyp15s7z0no06lu.us.auth0.com"
    clientId="So2xu3hRopCInZ9lYyZgxaBd89ahRffN"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
