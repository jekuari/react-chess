import { Piece } from "../Chessboard";
import { getPieceByPosition, posEquals } from "../Functions";

export const movePiece = (
  initial: number[],
  end: number[],
  pieces: Piece[],
  setPieces: React.Dispatch<React.SetStateAction<Piece[]>>,
  turnWhite: boolean,
  setTurnWhite: React.Dispatch<React.SetStateAction<boolean>>,
  highlightedSquares: number[][],
  edibleSquares: number[][],
) => {
  const piece = getPieceByPosition(initial, pieces);
  if (piece && piece.isWhite !== turnWhite) {
    alert("Not your turn");
    return;
  }
  setTurnWhite((prev) => !prev);
  console.log("moving");
  if (
    !highlightedSquares.some((highlightedSquare) =>
      posEquals(highlightedSquare, end),
    ) &&
    !edibleSquares.some((edibleSquare) => posEquals(edibleSquare, end))
  )
    return;
  setPieces((prev) => {
    const index = prev.findIndex((piece) => {
      return posEquals(piece.position, initial);
    });
    if (index === -1) return prev;
    prev[index].position = end;
    prev[index].moves = [...prev[index].moves, end];
    return prev;
  });
};
