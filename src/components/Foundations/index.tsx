import { useContext } from "react";
import { CardPilesContext } from "../../context/card-piles";
import FoundationsPile from "./Pile";

const Foundations = () => {
  const { foundations } = useContext(CardPilesContext);

  return (
    <div id="foundations">
      {foundations.map((foundation, pileIndex) => (
        <FoundationsPile
          key={"foundations" + pileIndex}
          cards={foundation}
          pileIndex={pileIndex}
        />
      ))}
    </div>
  );
};

export default Foundations;
