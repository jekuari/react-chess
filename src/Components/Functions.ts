import { Piece } from "./Chessboard";

export const getPieceByPosition = (position: number[], pieces: Piece[]) => {
  return pieces.find(
    (piece) => posEquals(piece.position, position) && !piece.isDead,
  );
};

export const posEquals = (pos1: number[], pos2: number[]) => {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

export const calcMoves = (
  position: number[],
  pieces: Piece[],
  setHighlightedSquares: React.Dispatch<React.SetStateAction<number[][]>>,
  setEdibleSquares: React.Dispatch<React.SetStateAction<number[][]>>,
) => {
  const piece = getPieceByPosition(position, pieces);
  if (!piece) {
    console.log("no piece");
    setHighlightedSquares([]);
    setEdibleSquares([]);
    return;
  }
  console.log(piece);
  let moves: number[][] = [];
  const edibles: number[][] = [];

  if (piece.type === "n") {
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
  }
  if (piece.type === "b") {
    // explore
    for (let i = 1; i < 8; i++) {
      const nextPosTL = [position[0] - i, position[1] - i];
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
      const nextPosTR = [position[0] + i, position[1] - i];
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
      const nextPosBL = [position[0] - i, position[1] + i];
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
      const nextPosBR = [position[0] + i, position[1] + i];
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
  }
  if (piece.type === "p") {
    // Determine direction based on pawn's color
    const direction = !piece.isWhite ? 1 : -1;

    if (piece.moves.length === 0) {
      const oneSquareForward = [position[0], position[1] + direction];
      const twoSquareForward = [position[0], position[1] + 2 * direction];
      const pieceInFront = getPieceByPosition(twoSquareForward, pieces);

      if (!pieceInFront) {
        setHighlightedSquares([oneSquareForward, twoSquareForward]);
        return;
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
  }

  if (piece.type === "r") {
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
  }
  if (piece.type === "q") {
    // explore
    for (let i = 1; i < 8; i++) {
      const nextPosTL = [position[0] - i, position[1] - i];
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
      const nextPosTR = [position[0] + i, position[1] - i];
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
      const nextPosBL = [position[0] - i, position[1] + i];
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
      const nextPosBR = [position[0] + i, position[1] + i];
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
    for (let i = 1; i < 8; i++) {
      const nextPosBR = [position[0] - i, position[1]];
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
    for (let i = 1; i < 8; i++) {
      const nextPosBR = [position[0] + i, position[1]];
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
    for (let i = 1; i < 8; i++) {
      const nextPosBR = [position[0], position[1] - i];
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
  }
  if (piece.type === "k") {
    const possibleMoves = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
    ];

    possibleMoves.forEach((direction) => {
      const x = position[0] + direction[0];
      const y = position[1] + direction[1];

      if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        const nextPosKing = [x, y];
        const pieceInPlace = getPieceByPosition(nextPosKing, pieces);

        if (!pieceInPlace || pieceInPlace.isDead) {
          moves.push(nextPosKing);
        } else {
          if (piece.isWhite !== pieceInPlace.isWhite) {
            edibles.push(nextPosKing);
          }
        }
      }
    });
  }
  setHighlightedSquares(moves);
  setEdibleSquares(edibles);
};
