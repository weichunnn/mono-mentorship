import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "rsuite/dist/rsuite.min.css";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/AuthWithHistory";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
