import { Coordinate, Move, Piece } from "../Chessboard";
import { getPieceByPosition } from "../Functions";

export const calcBishopMoves = (
  position: Coordinate,
  pieces: Piece[],
  piece: Piece,
) => {
  const moves: Move[] = [];
  // explore
  for (let i = 1; i < 8; i++) {
    const nextPosTL = { x: position.x - i, y: position.y - i };
    const pieceAtPosTL = getPieceByPosition(nextPosTL, pieces);
    if (!pieceAtPosTL || pieceAtPosTL.isDead) {
      moves.push({
        piece,
        from: position,
        to: nextPosTL,
        capturing: null,
      });
    } else {
      if (piece.isWhite !== pieceAtPosTL.isWhite) {
        moves.push({
          piece,
          from: position,
          to: nextPosTL,
          capturing: pieceAtPosTL,
        });
      }
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    const nextPosTR = { x: position.x + i, y: position.y - i };
    const pieceAtPosTR = getPieceByPosition(nextPosTR, pieces);
    if (!pieceAtPosTR || pieceAtPosTR.isDead) {
      moves.push({
        piece,
        from: position,
        to: nextPosTR,
        capturing: null,
      });
    } else {
      if (piece.isWhite !== pieceAtPosTR.isWhite) {
        moves.push({
          piece,
          from: position,
          to: nextPosTR,
          capturing: pieceAtPosTR,
        });
      }
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    const nextPosBL = { x: position.x - i, y: position.y + i };
    const pieceAtPosBL = getPieceByPosition(nextPosBL, pieces);
    if (!pieceAtPosBL || pieceAtPosBL.isDead) {
      moves.push({
        piece,
        from: position,
        to: nextPosBL,
        capturing: null,
      });
    } else {
      if (piece.isWhite !== pieceAtPosBL.isWhite) {
        moves.push({
          piece,
          from: position,
          to: nextPosBL,
          capturing: pieceAtPosBL,
        });
      }
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    const nextPosBR = { x: position.x + i, y: position.y + i };
    const pieceAtPosBR = getPieceByPosition(nextPosBR, pieces);
    if (!pieceAtPosBR || pieceAtPosBR.isDead) {
      moves.push({
        piece,
        from: position,
        to: nextPosBR,
        capturing: null,
      });
    } else {
      if (piece.isWhite !== pieceAtPosBR.isWhite) {
        moves.push({
          piece,
          from: position,
          to: nextPosBR,
          capturing: pieceAtPosBR,
        });
      }
      break;
    }
  }
  return moves;
};
