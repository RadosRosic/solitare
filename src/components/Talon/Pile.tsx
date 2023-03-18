import { Card } from "../../helpers/types";
import PlayingCard from "../PlayingCard";

const TalonPile: React.FC<{
  card: Card;
  pileIndex: number;
}> = ({ card }) => {
  return <PlayingCard card={card} cardIndex={0} />;
};

export default TalonPile;
