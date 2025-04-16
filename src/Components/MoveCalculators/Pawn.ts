import { Coordinate, Move, Piece } from "../Chessboard";
import { canEnPassant, getPieceByPosition } from "../Functions";

export const calcPawnMoves = (
  position: Coordinate,
  pieces: Piece[],
  piece: Piece,
  history: Move[],
) => {
  const moves: Move[] = [];
  const direction = !piece.isWhite ? 1 : -1;

  if (piece.moves.length === 0) {
    const oneSquareForward = { x: position.x, y: position.y + direction };
    const twoSquareForward = { x: position.x, y: position.y + 2 * direction };
    const pieceInFront = getPieceByPosition(oneSquareForward, pieces);
    const pieceTwoSquaresForward = getPieceByPosition(twoSquareForward, pieces);

    if (!pieceInFront) {
      moves.push({
        piece,
        from: position,
        to: oneSquareForward,
        capturing: null,
      });

      if (!pieceTwoSquaresForward) {
        moves.push({
          piece,
          from: position,
          to: twoSquareForward,
          capturing: null,
        });
      }
    }
  }

  const oneSquareForward = { x: position.x, y: position.y + direction };
  const pieceInFront = getPieceByPosition(oneSquareForward, pieces);

  if (!pieceInFront) {
    moves.push({
      piece,
      from: position,
      to: oneSquareForward,
      capturing: null,
    });
  }

  const leftCapture = { x: position.x - 1, y: position.y + direction };
  const rightCapture = { x: position.x + 1, y: position.y + direction };

  const pieceLeftCapture = getPieceByPosition(leftCapture, pieces);
  const pieceRightCapture = getPieceByPosition(rightCapture, pieces);

  if (pieceLeftCapture && pieceLeftCapture.isWhite !== piece.isWhite) {
    moves.push({
      piece,
      from: position,
      to: leftCapture,
      capturing: pieceLeftCapture,
    });
  }
  if (pieceRightCapture && pieceRightCapture.isWhite !== piece.isWhite) {
    moves.push({
      piece,
      from: position,
      to: rightCapture,
      capturing: pieceRightCapture,
    });
  }

  const isEnPassantPossible = canEnPassant({
    history,
    pieces,
    position,
  });
  if (isEnPassantPossible) {
    const pieceLeft = getPieceByPosition(
      { x: position.x - 1, y: position.y },
      pieces,
    );
    if (isEnPassantPossible === "left" && pieceLeft) {
      moves.push({
        piece,
        from: position,
        to: leftCapture,
        capturing: pieceLeft,
      });
    }

    const pieceRight = getPieceByPosition(
      { x: position.x + 1, y: position.y },
      pieces,
    );
    if (isEnPassantPossible === "right" && pieceRight) {
      moves.push({
        piece,
        from: position,
        to: rightCapture,
        capturing: pieceRight,
      });
    }
  }

  return moves;
};
