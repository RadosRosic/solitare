import { Card } from "../../helpers/types";
import PlayingCard from "../PlayingCard";
import "./Tableaus.css";

const TableausPile: React.FC<{
  cards: Card[];
  pileIndex: number;
}> = ({ cards, pileIndex }) => {
  return (
    <div className="tableaus" data-pile={pileIndex}>
      {cards.map((card, cardIndex) => (
        <PlayingCard
          key={card.suit + card.value}
          card={card}
          cardIndex={cardIndex}
        />
      ))}
    </div>
  );
};

export default TableausPile;
