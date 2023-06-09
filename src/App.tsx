import { useEffect } from "react";
import useInitializeGame from "./hooks/initialize-game";

import Foundations from "./components/Foundations";
import Stock from "./components/Stock";
import Tableaus from "./components/Tableaus";
import Talon from "./components/Talon";

import "./App.css";

function App() {
  const { startGame } = useInitializeGame();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="flex between">
          <div className="flex mb1">
            <Stock />
            <Talon />
          </div>
          <Foundations />
        </div>
        <Tableaus />
      </div>
    </div>
  );
}

export default App;
