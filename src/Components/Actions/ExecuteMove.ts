import { Move, Piece } from "../Chessboard";

export const executeMove = ({
  pieces,
  move,
}: {
  pieces: Piece[];
  move: Move;
}): Piece[] => {
  const { from, to, capturing } = move;

  let copy = [...pieces];

  if (capturing) {
    copy = copy.filter(
      (piece) =>
        !(
          piece.position.x === capturing.position.x &&
          piece.position.y === capturing.position.y
        ),
    );
  }

  copy = copy.map((piece) => {
    if (piece.position.x === from.x && piece.position.y === from.y) {
      return {
        ...piece,
        position: to,
        moves: [...piece.moves, to],
      };
    }
    return piece;
  });

  if (move.secondaryMove) {
    return executeMove({
      pieces: copy,
      move: move.secondaryMove,
    });
  }

  return copy;
};
