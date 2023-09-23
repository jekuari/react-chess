import { Piece } from "../Chessboard";
import { getPieceByPosition } from "../Functions";
import { calcBishopMoves } from "../MoveCalculators/Bishop";
import { calcKingMoves } from "../MoveCalculators/King";
import { calcKnightMoves } from "../MoveCalculators/Knight";
import { calcPawnMoves } from "../MoveCalculators/Pawn";
import { calcQueenMoves } from "../MoveCalculators/Queen";
import { calcRookMoves } from "../MoveCalculators/Rook";

export const calcMoves = (
  position: number[],
  pieces: Piece[],
  setHighlightedSquares: React.Dispatch<React.SetStateAction<number[][]>>,
  setEdibleSquares: React.Dispatch<React.SetStateAction<number[][]>>,
) => {
  const piece = getPieceByPosition(position, pieces);
  if (!piece) {
    setHighlightedSquares([]);
    setEdibleSquares([]);
    return;
  }
  switch (piece.type) {
    case "n":
      {
        const knight = calcKnightMoves(position, pieces, piece);
        setHighlightedSquares([...knight.moves]);
        setEdibleSquares([...knight.edibles]);
      }
      break;

    case "b":
      {
        const bishop = calcBishopMoves(position, pieces, piece);
        setHighlightedSquares([...bishop.moves]);
        setEdibleSquares([...bishop.edibles]);
      }
      break;
    case "r":
      {
        const rook = calcRookMoves(position, pieces, piece);
        setHighlightedSquares([...rook.moves]);
        setEdibleSquares([...rook.edibles]);
      }
      break;
    case "q":
      {
        const queen = calcQueenMoves(position, pieces, piece);
        setHighlightedSquares([...queen.moves]);
        setEdibleSquares([...queen.edibles]);
      }
      break;
    case "k":
      {
        const king = calcKingMoves(position, pieces, piece);
        setHighlightedSquares([...king.moves]);
        setEdibleSquares([...king.edibles]);
      }
      break;
    case "p":
      {
        const pawn = calcPawnMoves(position, pieces, piece);
        setHighlightedSquares([...pawn.moves]);
        setEdibleSquares([...pawn.edibles]);
      }
      break;
  }
};
