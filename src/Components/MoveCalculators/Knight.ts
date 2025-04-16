import { Coordinate, Move, Piece } from "../Chessboard";
import { posEquals } from "../Functions";

export const calcKnightMoves = (
  position: Coordinate,
  pieces: Piece[],
  piece: Piece,
): Move[] => {
  const moves: Move[] = [];
  const possibleMoves = [
    { x: position.x + 1, y: position.y + 2 },
    { x: position.x + 1, y: position.y - 2 },
    { x: position.x - 1, y: position.y + 2 },
    { x: position.x - 1, y: position.y - 2 },
    { x: position.x + 2, y: position.y + 1 },
    { x: position.x + 2, y: position.y - 1 },
    { x: position.x - 2, y: position.y + 1 },
    { x: position.x - 2, y: position.y - 1 },
  ];

  possibleMoves.forEach((move) => {
    if (move.x < 0 || move.x > 7 || move.y < 0 || move.y > 7) {
      return;
    }
    const pieceInPlace = pieces.find((piece) =>
      posEquals(move, piece.position),
    );
    if (pieceInPlace && pieceInPlace.isWhite !== piece.isWhite) {
      moves.push({
        piece: piece,
        from: position,
        to: move,
        capturing: pieceInPlace,
      });
    }

    if (!pieceInPlace) {
      moves.push({
        piece: piece,
        from: position,
        to: move,
        capturing: null,
      });
    }
  });
  return moves;
};
