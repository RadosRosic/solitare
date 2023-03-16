import { useContext } from "react";
import { CardPilesContext } from "../../context/card-piles";
import TableausPile from "./Pile";

import "./Tableaus.css";

const Tableaus = () => {
  const { tableaus } = useContext(CardPilesContext);

  return (
    <div id="tableaus">
      {tableaus.map((tableau, tableauIndex) => (
        <TableausPile
          cards={tableau}
          pileIndex={tableauIndex}
          key={"tab" + tableauIndex}
        />
      ))}
    </div>
  );
};

export default Tableaus;
