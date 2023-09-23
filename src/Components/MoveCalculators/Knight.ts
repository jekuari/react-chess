import { Piece } from "../Chessboard";
import { posEquals } from "../Functions";

export const calcKnightMoves = (
  position: number[],
  pieces: Piece[],
  piece: Piece,
) => {
  let moves: number[][] = [];
  const edibles: number[][] = [];
  const possibleMoves = [
    [position[0] + 1, position[1] + 2],
    [position[0] + 1, position[1] - 2],
    [position[0] - 1, position[1] + 2],
    [position[0] - 1, position[1] - 2],
    [position[0] + 2, position[1] + 1],
    [position[0] + 2, position[1] - 1],
    [position[0] - 2, position[1] + 1],
    [position[0] - 2, position[1] - 1],
  ];
  moves = possibleMoves.filter((move) => {
    if (move[0] < 0 || move[0] > 7 || move[1] < 0 || move[1] > 7) {
      return false;
    }
    const pieceInPlace = pieces.find((piece) =>
      posEquals(move, piece.position),
    );
    if (pieceInPlace) {
      if (pieceInPlace.isWhite !== piece.isWhite) {
        edibles.push(pieceInPlace.position);
      }
      return false;
    }
    return true;
  });
  return { moves, edibles };
};
