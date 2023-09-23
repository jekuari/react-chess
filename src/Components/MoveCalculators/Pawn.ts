import { Piece } from "../Chessboard";
import { getPieceByPosition } from "../Functions";

export const calcPawnMoves = (
  position: number[],
  pieces: Piece[],
  piece: Piece,
) => {
  const moves: number[][] = [];
  const edibles: number[][] = [];
  // Determine direction based on pawn's color
  const direction = !piece.isWhite ? 1 : -1;

  if (piece.moves.length === 0) {
    const oneSquareForward = [position[0], position[1] + direction];
    const twoSquareForward = [position[0], position[1] + 2 * direction];
    const pieceInFront = getPieceByPosition(twoSquareForward, pieces);

    if (!pieceInFront) {
      moves.push(oneSquareForward);
      moves.push(twoSquareForward);
      return { moves, edibles };
    }
  }

  const oneSquareForward = [position[0], position[1] + direction];
  const pieceInFront = getPieceByPosition(oneSquareForward, pieces);

  if (!pieceInFront) {
    moves.push(oneSquareForward);

    // If it's pawn's first move
    if (
      (piece.isWhite && position[1] === 1) ||
      (!piece.isWhite && position[1] === 6)
    ) {
      const twoSquaresForward = [position[0], position[1] + 2 * direction];
      const pieceTwoSquaresForward = getPieceByPosition(
        twoSquaresForward,
        pieces,
      );

      if (!pieceTwoSquaresForward) {
        moves.push(twoSquaresForward);
      }
    }

    // Check diagonal captures
    const leftCapture = [position[0] - 1, position[1] + direction];
    const rightCapture = [position[0] + 1, position[1] + direction];
    const pieceLeftCapture = getPieceByPosition(leftCapture, pieces);
    const pieceRightCapture = getPieceByPosition(rightCapture, pieces);

    if (pieceLeftCapture && pieceLeftCapture.isWhite !== piece.isWhite) {
      edibles.push(leftCapture);
    }
    if (pieceRightCapture && pieceRightCapture.isWhite !== piece.isWhite) {
      edibles.push(rightCapture);
    }
  }
  return { moves, edibles };
};
