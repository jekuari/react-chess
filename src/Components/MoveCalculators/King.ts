import { Coordinate, Move, Piece } from "../Chessboard";
import {
  filterOutMovesThatLeaveKingInCheck,
  getPieceByPosition,
} from "../Functions";

export const calcKingMoves = ({
  position,
  pieces,
  piece,
  history,
  skipCheck = false,
}: {
  position: Coordinate;
  pieces: Piece[];
  piece: Piece;
  history: Move[];
  skipCheck?: boolean;
}) => {
  const moves: Move[] = [];
  const possibleMoves = [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
  ];

  possibleMoves.forEach((direction) => {
    const x = position.x + direction.x;
    const y = position.y + direction.y;

    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      const nextPosKing = { x: x, y: y };
      const pieceInPlace = getPieceByPosition(nextPosKing, pieces);

      if (!pieceInPlace || pieceInPlace.isDead) {
        moves.push({
          piece,
          from: position,
          to: nextPosKing,
          capturing: null,
        });
      } else {
        if (piece.isWhite !== pieceInPlace.isWhite) {
          moves.push({
            piece,
            from: position,
            to: nextPosKing,
            capturing: pieceInPlace,
          });
        }
      }
    }
  });

  // Castling left

  const leftRook = getPieceByPosition(
    { x: position.x - 4, y: position.y },
    pieces,
  );

  if (
    leftRook &&
    leftRook.type === "r" &&
    leftRook.moves.length === 0 &&
    piece.moves.length === 0
  ) {
    const square1 = getPieceByPosition(
      { x: position.x - 3, y: position.y },
      pieces,
    );
    const square2 = getPieceByPosition(
      { x: position.x - 2, y: position.y },
      pieces,
    );

    if (!square1 && !square2) {
      moves.push({
        piece,
        from: position,
        to: { x: position.x - 2, y: position.y },
        secondaryMove: {
          piece: leftRook,
          from: { x: position.x - 4, y: position.y },
          to: { x: position.x - 1, y: position.y },
          capturing: null,
        },
        capturing: null,
      });
    }
  }

  // Castling right
  const rightRook = getPieceByPosition(
    { x: position.x + 3, y: position.y },
    pieces,
  );

  if (
    rightRook &&
    rightRook.type === "r" &&
    rightRook.moves.length === 0 &&
    piece.moves.length === 0
  ) {
    const square1 = getPieceByPosition(
      { x: position.x + 1, y: position.y },
      pieces,
    );
    const square2 = getPieceByPosition(
      { x: position.x + 2, y: position.y },
      pieces,
    );

    if (!square1 && !square2) {
      moves.push({
        piece,
        from: position,
        to: { x: position.x + 2, y: position.y },
        secondaryMove: {
          piece: rightRook,
          from: { x: position.x + 3, y: position.y },
          to: { x: position.x + 1, y: position.y },
          capturing: null,
        },
        capturing: null,
      });
    }
  }

  if (!skipCheck) {
    // simulate all moves and see if king is in check
    return filterOutMovesThatLeaveKingInCheck({
      pieces,
      history,
      moves,
    });
  }

  return moves;
};
