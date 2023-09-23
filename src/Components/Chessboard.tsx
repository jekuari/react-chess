import { useEffect, useState } from "react";
import { calcMoves, posEquals } from "./Functions";
import {
  makeBishop,
  makeKing,
  makeKnight,
  makePawn,
  makeQueen,
  makeRook,
} from "./Makers";

export interface Piece {
  image: string | undefined;
  position: number[];
  isWhite: boolean;
  isDead: boolean;
  type: "k" | "q" | "r" | "b" | "n" | "p";
  moves: number[][];
}

function ChessBoard() {
  const [turnWhite, setTurnWhite] = useState(true);
  const [highlightedSquares, setHighlightedSquares] = useState<number[][]>([]);
  const [edibleSquares, setEdibleSquares] = useState<number[][]>([]);
  const [pieceToMove, setPieceToMove] = useState<number[] | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([
    makeRook([0, 0], false),
    makeKnight([1, 0], false),
    makeBishop([2, 0], false),
    makeQueen([3, 0], false),
    makeKing([4, 0], false),
    makeBishop([5, 0], false),
    makeKnight([6, 0], false),
    makeRook([7, 0], false),
    makePawn([0, 1], false),
    makePawn([1, 1], false),
    makePawn([2, 1], false),
    makePawn([3, 1], false),
    makePawn([4, 1], false),
    makePawn([5, 1], false),
    makePawn([6, 1], false),
    makePawn([7, 1], false),
    makePawn([0, 6], true),
    makePawn([1, 6], true),
    makePawn([2, 6], true),
    makePawn([3, 6], true),
    makePawn([4, 6], true),
    makePawn([5, 6], true),
    makePawn([6, 6], true),
    makePawn([7, 6], true),
    makeRook([0, 7], true),
    makeKnight([1, 7], true),
    makeBishop([2, 7], true),
    makeQueen([3, 7], true),
    makeKing([4, 7], true),
    makeBishop([5, 7], true),
    makeKnight([6, 7], true),
    makeRook([7, 7], true),
  ]);

  useEffect(() => {
    const whiteKing = pieces.find(
      (piece) => piece.type === "k" && piece.isWhite,
    );
    const darkKing = pieces.find(
      (piece) => piece.type === "k" && !piece.isWhite,
    );

    if (!whiteKing) {
      alert("Black wins!");
    }

    if (!darkKing) {
      alert("White wins!");
    }
  }, [pieces]);

  const getPieceByPosition = (position: number[]): Piece | undefined => {
    return pieces.find(
      (piece) => posEquals(piece.position, position) && !piece.isDead,
    );
  };

  const move = (initial: number[], end: number[]) => {
    const piece = getPieceByPosition(initial);
    if (piece && piece.isWhite !== turnWhite) {
      alert("Not your turn");
      return;
    }
    setTurnWhite((prev) => !prev);
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
      prev[index].moves = [...prev[index].moves, end];
      return prev;
    });
  };

  const eat = (initial: number[], end: number[]) => {
    const piece = getPieceByPosition(initial);
    if (piece && piece.isWhite !== turnWhite) {
      alert("Not your turn");
      return;
    }
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
    setTurnWhite((prev) => !prev);
  };

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

  // modulerized this function to make this file more readable
  const getMoves = (position: number[]) => {
    return calcMoves(position, pieces, setHighlightedSquares, setEdibleSquares);
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
