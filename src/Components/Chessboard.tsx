import { useEffect, useState } from "react";
import { makeBoard, posEquals } from "./Functions";
import { eatPiece } from "./Actions/EatPiece";
import { movePiece } from "./Actions/MovePiece";
import { calcMoves } from "./Actions/CalcMoves";

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
  const [pieces, setPieces] = useState<Piece[]>(makeBoard());

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
    movePiece(
      initial,
      end,
      pieces,
      setPieces,
      turnWhite,
      setTurnWhite,
      highlightedSquares,
      edibleSquares,
    );
  };

  const eat = (initial: number[], end: number[]) => {
    eatPiece(initial, end, pieces, setPieces, turnWhite, setTurnWhite);
  };

  const getMoves = (position: number[]) => {
    return calcMoves(position, pieces, setHighlightedSquares, setEdibleSquares);
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
