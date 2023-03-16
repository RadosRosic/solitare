import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CardPilesContextProvider } from "./context/card-piles";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CardPilesContextProvider>
      <App />
    </CardPilesContextProvider>
  </React.StrictMode>
);
