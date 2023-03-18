import ReactDOM from "react-dom/client";
import { CardPilesContextProvider } from "./context/card-piles";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CardPilesContextProvider>
    <App />
  </CardPilesContextProvider>
);
