import { useEffect } from "react";
import useInitializeGame from "./hooks/initialize-game";

import Foundations from "./components/Foundations";
import Stock from "./components/Stock";
import Tableaus from "./components/Tableaus";
import Talon from "./components/Talon";

function App() {
  const { startGame } = useInitializeGame();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex" }}>
          <Stock />
          <Talon />
        </div>
        <Foundations />
      </div>

      <Tableaus />
    </>
  );
}

export default App;
