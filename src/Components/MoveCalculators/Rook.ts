import { Piece } from "../Chessboard";
import { getPieceByPosition } from "../Functions";

export const calcRookMoves = (
  position: number[],
  pieces: Piece[],
  piece: Piece,
) => {
  const moves: number[][] = [];
  const edibles: number[][] = [];
  // explore
  for (let i = 1; i < 8; i++) {
    const nextPosTL = [position[0] - i, position[1]];
    const pieceAtPosTL = getPieceByPosition(nextPosTL, pieces);
    if (!pieceAtPosTL || pieceAtPosTL.isDead) {
      moves.push(nextPosTL);
    } else {
      if (piece.isWhite !== pieceAtPosTL.isWhite) {
        edibles.push(nextPosTL);
      }
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    const nextPosTR = [position[0], position[1] - i];
    const pieceAtPosTR = getPieceByPosition(nextPosTR, pieces);
    if (!pieceAtPosTR || pieceAtPosTR.isDead) {
      moves.push(nextPosTR);
    } else {
      if (piece.isWhite !== pieceAtPosTR.isWhite) {
        edibles.push(nextPosTR);
      }
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    const nextPosBL = [position[0] + i, position[1]];
    const pieceAtPosBL = getPieceByPosition(nextPosBL, pieces);
    if (!pieceAtPosBL || pieceAtPosBL.isDead) {
      moves.push(nextPosBL);
    } else {
      if (piece.isWhite !== pieceAtPosBL.isWhite) {
        edibles.push(nextPosBL);
      }
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    const nextPosBR = [position[0], position[1] + i];
    const pieceAtPosBR = getPieceByPosition(nextPosBR, pieces);
    if (!pieceAtPosBR || pieceAtPosBR.isDead) {
      moves.push(nextPosBR);
    } else {
      if (piece.isWhite !== pieceAtPosBR.isWhite) {
        edibles.push(nextPosBR);
      }
      break;
    }
  }
  return { moves, edibles };
};
