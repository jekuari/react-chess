import { Move, Piece } from "../Chessboard";
import { calcBishopMoves } from "../MoveCalculators/Bishop";
import { calcKingMoves } from "../MoveCalculators/King";
import { calcKnightMoves } from "../MoveCalculators/Knight";
import { calcPawnMoves } from "../MoveCalculators/Pawn";
import { calcQueenMoves } from "../MoveCalculators/Queen";
import { calcRookMoves } from "../MoveCalculators/Rook";

export const calcMoves = ({
  piece,
  pieces,
  history,
  options = {
    skipCheck: false,
  },
}: {
  piece: Piece;
  pieces: Piece[];
  history: Move[];
  options?: {
    skipCheck?: boolean;
  };
}): Move[] => {
  switch (piece.type) {
    case "n": {
      return calcKnightMoves(piece.position, pieces, piece);
    }
    case "b": {
      return calcBishopMoves(piece.position, pieces, piece);
    }
    case "r": {
      return calcRookMoves(piece.position, pieces, piece);
    }
    case "q": {
      return calcQueenMoves(piece.position, pieces, piece);
    }
    case "k": {
      return calcKingMoves({
        position: piece.position,
        pieces,
        piece,
        history,
        skipCheck: options.skipCheck,
      });
    }
    case "p": {
      return calcPawnMoves(piece.position, pieces, piece, history);
    }
    default: {
      return [];
    }
  }
};
