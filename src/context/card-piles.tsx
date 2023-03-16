import { createContext, useReducer } from "react";

import { Card } from "../helpers/types";

const initialState = {
  stock: [],
  talon: [],
  tableaus: [[], [], [], [], [], [], []],
  foundations: [[], [], [], []],
  pickupLocation: { pileType: null, pileNumber: null, cardNumber: null },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setStock":
      return { ...state, stock: action.payload };
    case "setTalon":
      return { ...state, talon: action.payload };
    case "setTableaus":
      return { ...state, tableaus: action.payload };
    case "setFoundations":
      return { ...state, foundations: action.payload };
    case "setPickupLocation":
      return { ...state, pickupLocation: action.payload };
    default:
      return state;
  }
};

const getClickedElement = (clickedElement: HTMLElement) => {
  const clickedPileType = clickedElement!.parentElement!.parentElement!.id!;
  const clickedPileNumber = +clickedElement.parentElement?.dataset.pile!;
  const clickedCardNumber = +clickedElement.dataset.card!;

  return { clickedPileType, clickedPileNumber, clickedCardNumber };
};

export const CardPilesContext = createContext<{
  talon: Card[] | null;
  tableaus: Card[][];
  setStock: (stock: Card[]) => void;
  setTableaus: (tableaus: Card[][]) => void;
  drawCard: () => void;
  selectCard: (event: React.MouseEvent) => void;
}>({
  ...initialState,
  setTableaus: () => {},
  setStock: () => {},
  // setTalon: () => {},
  // setFoundations: () => {},
  drawCard: () => {},
  selectCard: () => {},
  // dropCards: () => {},
  // unselectCards: () => {},
});

export const CardPilesContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTableaus = (tableaus: Card[][]) => {
    dispatch({ type: "setTableaus", payload: tableaus });
  };

  const setStock = (stock: Card[]) => {
    dispatch({ type: "setStock", payload: stock });
  };

  const setFoundations = (foundations: (Card[] | null)[]) => {
    dispatch({ type: "setFoundations", payload: foundations });
  };

  const setTalon = (talon: Card[] | null) => {
    dispatch({ type: "setTalon", payload: talon });
  };

  const drawCard = () => {
    const { stock, talon } = state;

    if (stock.length > 0) {
      const drawnCard = stock.at(-1);
      drawnCard.faceUp = true;
      const newStock = stock.slice(0, -1);
      const newTalon = [drawnCard, ...talon];

      dispatch({ type: "setStock", payload: newStock });
      dispatch({ type: "setTalon", payload: newTalon });
    }
  };

  const selectCard = (event: React.MouseEvent) => {
    const pickupLocation = getClickedElement(event.target as HTMLElement);

    dispatch({ type: "setPickupLocation", payload: pickupLocation });
  };

  return (
    <CardPilesContext.Provider
      value={{
        talon: state.talon,
        tableaus: state.tableaus,
        setStock,
        setTableaus,
        drawCard,
        selectCard,
      }}
    >
      {children}
    </CardPilesContext.Provider>
  );
};
