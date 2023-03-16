import { useContext } from "react";
import { CardPilesContext } from "../../context/card-piles";
import TalonPile from "./Pile";

const Talon = () => {
  const { talon } = useContext(CardPilesContext);
  return (
    <div id="talon">
      <div data-pile={0}>
        {!!talon?.length && <TalonPile card={talon![0]} pileIndex={0} />}
      </div>
    </div>
  );
};

export default Talon;
