import { Card } from "../../helpers/types";
import EmptyPile from "../EmptyPile";
import PlayingCard from "../PlayingCard";
import "./Tableaus.css";

const TableausPile: React.FC<{
  cards: Card[];
  pileIndex: number;
}> = ({ cards, pileIndex }) => {
  return (
    <div className="tableaus" data-pile={pileIndex}>
      {!!cards.length ? (
        cards.map((card, cardIndex) => (
          <PlayingCard
            key={card.suit + card.value}
            card={card}
            cardIndex={cardIndex}
          />
        ))
      ) : (
        <EmptyPile />
      )}
    </div>
  );
};

export default TableausPile;
