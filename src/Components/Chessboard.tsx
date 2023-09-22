import { useState } from "react";
import imgKingLight from "../assets/chesspieces/Chess_klt45.svg";
import imgKingDark from "../assets/chesspieces/Chess_kdt45.svg";
import imgQueenLight from "../assets/chesspieces/Chess_qlt45.svg";
import imgQueenDark from "../assets/chesspieces/Chess_qdt45.svg";
import imgTowerLight from "../assets/chesspieces/Chess_rlt45.svg";
import imgTowerDark from "../assets/chesspieces/Chess_rdt45.svg";
import imgBishopLight from "../assets/chesspieces/Chess_blt45.svg";
import imgBishopDark from "../assets/chesspieces/Chess_bdt45.svg";
import imgKnightLight from "../assets/chesspieces/Chess_nlt45.svg";
import imgKnightDark from "../assets/chesspieces/Chess_ndt45.svg";
import imgPawnLight from "../assets/chesspieces/Chess_plt45.svg";
import imgPawnDark from "../assets/chesspieces/Chess_pdt45.svg";

interface Piece {
  image: string | undefined;
  position: number[];
  isWhite: boolean;
  isDead: boolean;
  type: "k" | "q" | "r" | "b" | "n" | "p";
}

function ChessBoard() {
  const getMoves = (position: number[]) => {
    const piece = getPieceByPosition(position);
    console.log(piece, "clicked piece");
    if (!piece) {
      setHighlightedSquares([]);
      setEdibleSquares([]);
      return;
    }

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
        const pieceAtPosTL = getPieceByPosition(nextPosTL);
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
        const pieceAtPosTR = getPieceByPosition(nextPosTR);
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
        const pieceAtPosBL = getPieceByPosition(nextPosBL);
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
        const pieceAtPosBR = getPieceByPosition(nextPosBR);
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
        const pieceAtPosTL = getPieceByPosition(nextPosTL);
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
        const pieceAtPosTR = getPieceByPosition(nextPosTR);
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
        const pieceAtPosBL = getPieceByPosition(nextPosBL);
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
        const pieceAtPosBR = getPieceByPosition(nextPosBR);
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
        const nextPosBR = [position[0] -i, position[1]];
        const pieceAtPosBR = getPieceByPosition(nextPosBR);
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
        const nextPosBR = [position[0] +i, position[1]];
        const pieceAtPosBR = getPieceByPosition(nextPosBR);
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
        const nextPosBR = [position[0] , position[1]+i];
        const pieceAtPosBR = getPieceByPosition(nextPosBR);
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
        const nextPosBR = [position[0] , position[1]-i];
        const pieceAtPosBR = getPieceByPosition(nextPosBR);
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
    setHighlightedSquares(moves);
    setEdibleSquares(edibles);
  };

  const posEquals = (pos1: number[], pos2: number[]) => {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  };
  const getPieceByPosition = (position: number[]): Piece | undefined => {
    return pieces.find(
      (piece) => posEquals(piece.position, position) && !piece.isDead,
    );
  };

  const makeKnight = (position: number[], isWhite: boolean) => {
    const knight: Piece = {
      image: isWhite ? imgKnightLight : imgKnightDark,
      position: position,
      isWhite,
      isDead: false,
      type: "n",
    };
    return knight;
  };

  const makeBishop = (position: number[], isWhite: boolean) => {
    const knight: Piece = {
      image: isWhite ? imgBishopLight : imgBishopDark,
      position: position,
      isWhite,
      isDead: false,
      type: "b",
    };
    return knight;
  };

  const makeQueen = (position: number[], isWhite: boolean) => {
    const knight: Piece = {
      image: isWhite ? imgQueenLight : imgQueenDark,
      position: position,
      isWhite,
      isDead: false,
      type: "q",
    };
    return knight;
  };

  const [pieces, setPieces] = useState<Piece[]>([
    makeKnight([3, 3], true),
    makeBishop([2, 2], false),
    makeKnight([0, 4], false),



    makeQueen([3, 0], true),
  ]);

  const move = (initial: number[], end: number[]) => {
    console.log("moving");
    if (
      !highlightedSquares.some((highlightedSquare) =>
        posEquals(highlightedSquare, end),
      ) &&
      !edibleSquares.some((edibleSquare) => posEquals(edibleSquare, end))
    )
      return;
    setPieces((prev) => {
      const index = prev.findIndex((piece) => {
        return posEquals(piece.position, initial);
      });
      if (index === -1) return prev;
      prev[index].position = end;
      return prev;
    });
  };

  const eat = (initial: number[], end: number[]) => {
    setPieces((prev) => {
      let copy = [...prev];

      copy = copy.filter((piece) => {
        return !posEquals(piece.position, end);
      });

      copy = copy.map((piece) => {
        if (posEquals(piece.position, initial)) {
          return {
            ...piece,
            position: end,
          };
        }
        return piece;
      });

      return copy;
    });
  };

  const [highlightedSquares, setHighlightedSquares] = useState<number[][]>([]);
  const [edibleSquares, setEdibleSquares] = useState<number[][]>([]);
  const [pieceToMove, setPieceToMove] = useState<number[] | null>(null);

  const handleCellClick = (position: number[]) => {
    const piece = getPieceByPosition(position);
    if (!piece) {
      if (pieceToMove) {
        move(pieceToMove, position);
        setPieceToMove(null);
      }
      setHighlightedSquares([]);
      setEdibleSquares([]);
      return;
    }
    if (
      pieceToMove &&
      edibleSquares.some((edibleSquare) => posEquals(edibleSquare, position))
    ) {
      eat(pieceToMove, position);
      setHighlightedSquares([]);
      setEdibleSquares([]);
      setPieceToMove(null);
      return;
    }
    getMoves(position);
    setPieceToMove(position);
  };

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className="grid w-max auto-rows-fr grid-cols-8">
        {Array.from(Array(64)).map((_, key) => {
          const piece = pieces.find(
            (piece) => piece.position[0] + piece.position[1] * 8 === key,
          );

          const thisSquare = [key % 8, Math.floor(key / 8)];

          const isHighlighted = highlightedSquares.some((highlightedSquare) => {
            return posEquals(highlightedSquare, thisSquare);
          });

          const isEdible = edibleSquares.some((edibleSquare) => {
            return posEquals(edibleSquare, thisSquare);
          });

          return (
            <button
              key={`piece-${key}`}
              className={`flex h-[5rem] w-[5rem] items-center justify-center p-2 ${
                isEdible
                  ? "bg-red-500"
                  : isHighlighted
                  ? "bg-green-500 hover:cursor-pointer"
                  : Math.floor(key / 8) % 2 === 0
                  ? key % 2 === 0
                    ? "bg-neutral-100"
                    : "bg-neutral-800"
                  : key % 2 === 0
                  ? "bg-neutral-800"
                  : "bg-neutral-100"
              } ${piece ? "hover:cursor-pointer" : "hover:cursor-default"}`}
              onClick={(e) => {
                e.preventDefault();
                handleCellClick(thisSquare);
              }}
            >
              {piece && !piece.isDead && (
                <img src={piece.image} className="h-full w-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ChessBoard;
