import { useContext } from "react";
import { CardPilesContext } from "../context/card-piles";

import "./EmptyPile.css";

const EmptyPile = () => {
  const { moveCard, isCardSelected } = useContext(CardPilesContext);
  return (
    <div
      className="empty-pile"
      data-card={0}
      onClick={(e) => (isCardSelected ? moveCard(e) : undefined)}
    ></div>
  );
};

export default EmptyPile;
