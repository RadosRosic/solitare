import { useEffect } from "react";
import Stock from "./components/Stock";
import Tableaus from "./components/Tableaus";
import Talon from "./components/Talon";
import useInitializeGame from "./hooks/initialize-game";

function App() {
  const { startGame } = useInitializeGame();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div>
      <Stock />
      <Talon />
      <Tableaus />
    </div>
  );
}

export default App;
