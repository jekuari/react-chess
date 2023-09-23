import { Piece } from "../Chessboard";
import { getPieceByPosition, posEquals } from "../Functions";

export const eatPiece = (
  initial: number[],
  end: number[],
  pieces: Piece[],
  setPieces: React.Dispatch<React.SetStateAction<Piece[]>>,
  turnWhite: boolean,
  setTurnWhite: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const piece = getPieceByPosition(initial, pieces);
  if (piece && piece.isWhite !== turnWhite) {
    alert("Not your turn");
    return;
  }
  setPieces((prev) => {
    let copy = [...prev];

    copy = copy.filter((piece) => {
      return !posEquals(piece.position, end);
    });

    copy = copy.map((piece) => {
      if (posEquals(piece.position, initial)) {
        return {
          ...piece,
          position: end,
        };
      }
      return piece;
    });

    return copy;
  });
  setTurnWhite((prev) => !prev);
};
