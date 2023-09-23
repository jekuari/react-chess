import { Piece } from "../Chessboard";
import { getPieceByPosition } from "../Functions";

export const calcKingMoves = (
  position: number[],
  pieces: Piece[],
  piece: Piece,
) => {
  const moves: number[][] = [];
  const edibles: number[][] = [];
  const possibleMoves = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];

  possibleMoves.forEach((direction) => {
    const x = position[0] + direction[0];
    const y = position[1] + direction[1];

    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      const nextPosKing = [x, y];
      const pieceInPlace = getPieceByPosition(nextPosKing, pieces);

      if (!pieceInPlace || pieceInPlace.isDead) {
        moves.push(nextPosKing);
      } else {
        if (piece.isWhite !== pieceInPlace.isWhite) {
          edibles.push(nextPosKing);
        }
      }
    }
  });
  return { moves, edibles };
};
