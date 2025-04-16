import { calcMoves } from "./Actions/CalcMoves";
import { executeMove } from "./Actions/ExecuteMove";
import { Coordinate, Move, Piece } from "./Chessboard";
import {
  makeBishop,
  makeKing,
  makeKnight,
  makePawn,
  makeQueen,
  makeRook,
} from "./Makers";

export const getPieceByPosition = (position: Coordinate, pieces: Piece[]) => {
  return pieces.find(
    (piece) => posEquals(piece.position, position) && !piece.isDead,
  );
};

export const posEquals = (pos1: Coordinate, pos2: Coordinate) => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

export const makeBoard = () => {
  return [
    makeRook({ x: 0, y: 0 }, false),
    makeKnight({ x: 1, y: 0 }, false),
    makeBishop({ x: 2, y: 0 }, false),
    makeQueen({ x: 3, y: 0 }, false),
    makeKing({ x: 4, y: 0 }, false),
    makeBishop({ x: 5, y: 0 }, false),
    makeKnight({ x: 6, y: 0 }, false),
    makeRook({ x: 7, y: 0 }, false),
    makePawn({ x: 0, y: 1 }, false),
    makePawn({ x: 1, y: 1 }, false),
    makePawn({ x: 2, y: 1 }, false),
    makePawn({ x: 3, y: 1 }, false),
    makePawn({ x: 4, y: 1 }, false),
    makePawn({ x: 5, y: 1 }, false),
    makePawn({ x: 6, y: 1 }, false),
    makePawn({ x: 7, y: 1 }, false),
    makePawn({ x: 0, y: 6 }, true),
    makePawn({ x: 1, y: 6 }, true),
    makePawn({ x: 2, y: 6 }, true),
    makePawn({ x: 3, y: 6 }, true),
    makePawn({ x: 4, y: 6 }, true),
    makePawn({ x: 5, y: 6 }, true),
    makePawn({ x: 6, y: 6 }, true),
    makePawn({ x: 7, y: 6 }, true),
    makeRook({ x: 0, y: 7 }, true),
    makeKnight({ x: 1, y: 7 }, true),
    makeBishop({ x: 2, y: 7 }, true),
    makeQueen({ x: 3, y: 7 }, true),
    makeKing({ x: 4, y: 7 }, true),
    makeBishop({ x: 5, y: 7 }, true),
    makeKnight({ x: 6, y: 7 }, true),
    makeRook({ x: 7, y: 7 }, true),
  ];
};

export const canEnPassant = ({
  history,
  pieces,
  position,
}: {
  history: Move[];
  pieces: Piece[];
  position: Coordinate;
}) => {
  if (history.length > 0) {
    const lastMove = history[history.length - 1];

    if (lastMove.piece.type === "p") {
      const diff = lastMove.from.y - lastMove.to.y;
      if (
        (lastMove.piece.isWhite && diff === 2) ||
        (!lastMove.piece.isWhite && diff === -2)
      ) {
        const anPassantLeft = { x: position.x - 1, y: position.y };
        const anPassantRight = { x: position.x + 1, y: position.y };

        const pieceLeft = getPieceByPosition(anPassantLeft, pieces);
        const pieceRight = getPieceByPosition(anPassantRight, pieces);

        if (
          pieceLeft &&
          pieceLeft.position.y === lastMove.to.y &&
          pieceLeft.position.x === lastMove.to.x
        ) {
          return "left";
        }

        if (
          pieceRight &&
          pieceRight.position.y === lastMove.to.y &&
          pieceRight.position.x === lastMove.to.x
        ) {
          return "right";
        }
      }
    }
  }
};

export const isKingInCheck = ({
  pieces,
  history,
}: {
  pieces: Piece[];
  history: Move[];
}) => {
  for (const piece of pieces) {
    const moves = calcMoves({
      piece: piece,
      pieces: pieces,
      history: history,
      options: {
        skipCheck: true,
      },
    });

    for (const move of moves) {
      if (move.capturing && move.capturing.type === "k") {
        return move.capturing.isWhite ? "white" : "black";
      }
    }
  }

  return null;
};

export const filterOutMovesThatLeaveKingInCheck = ({
  pieces,
  history,
  moves,
}: {
  pieces: Piece[];
  history: Move[];
  moves: Move[];
}) => {
  return moves.filter((move) => {
    const newPieces = executeMove({
      pieces,
      move,
    });

    const kingInCheck = isKingInCheck({
      pieces: newPieces,
      history: [...history, move],
    });

    if (
      !kingInCheck ||
      (move.piece.isWhite && kingInCheck === "black") ||
      (!move.piece.isWhite && kingInCheck === "white")
    ) {
      return true;
    }

    return false;
  });
};
