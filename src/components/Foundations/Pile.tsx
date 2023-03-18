import { useContext } from "react";
import { CardPilesContext } from "../../context/card-piles";
import { Card } from "../../helpers/types";
import EmptyPile from "../EmptyPile";
import PlayingCard from "../PlayingCard";

import "./Foundations.css";

const FoundationsPile: React.FC<{
  cards: Card[];
  pileIndex: number;
}> = ({ cards, pileIndex }) => {
  const { moveCard } = useContext(CardPilesContext);
  const topCard = cards[0];
  return (
    <div className="foundation" data-pile={pileIndex}>
      {!!cards.length ? (
        <PlayingCard
          key={topCard!.suit + topCard!.value}
          card={topCard!}
          cardIndex={0}
        />
      ) : (
        <EmptyPile />
      )}
    </div>
  );
};

export default FoundationsPile;
