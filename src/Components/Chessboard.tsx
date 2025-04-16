import { useCallback, useEffect, useMemo, useState } from "react";
import { calcMoves } from "./Actions/CalcMoves";
import { executeMove } from "./Actions/ExecuteMove";
import {
  filterOutMovesThatLeaveKingInCheck,
  isKingInCheck,
  makeBoard,
  posEquals,
} from "./Functions";

export interface Piece {
  image: string | undefined;
  position: Coordinate;
  isWhite: boolean;
  isDead: boolean;
  type: "k" | "q" | "r" | "b" | "n" | "p";
  moves: Coordinate[];
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Move {
  piece: Piece;
  from: Coordinate;
  to: Coordinate;
  capturing: Piece | null;
  secondaryMove?: Move;
}

function ChessBoard() {
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
  const [pieces, setPieces] = useState<Piece[]>(makeBoard());
  const [history, setHistory] = useState<Move[]>([]);

  useEffect(() => {
    const whiteKing = pieces.find(
      (piece) => piece.type === "k" && piece.isWhite,
    );
    const darkKing = pieces.find(
      (piece) => piece.type === "k" && !piece.isWhite,
    );

    // TODO: Improve logic

    if (!whiteKing) {
      alert("Black wins!");
    }

    if (!darkKing) {
      alert("White wins!");
    }
  }, [pieces]);

  const getMoves = useCallback(
    (piece: Piece) => {
      return calcMoves({ piece, pieces, history });
    },
    [pieces, history],
  );

  const kingOnCheck = useMemo(() => {
    const v = isKingInCheck({ pieces, history });
    return v;
  }, [pieces, history]);

  const handleCellClick = useCallback(
    ({ piece, move }: { piece?: Piece; move: Move | undefined }) => {
      if (move) {
        setPieces(
          executeMove({
            move,
            pieces,
          }),
        );

        setHistory((prev) => [...prev, move]);
        setIsWhiteTurn((prev) => !prev);
        setPossibleMoves([]);
        return;
      }

      if (piece && piece.isWhite !== isWhiteTurn) {
        setPossibleMoves([]);
        return;
      }

      if (!piece) {
        setPossibleMoves([]);
        return;
      }

      const moves = getMoves(piece);

      const movesWithoutLeavingTheKingOnCheck =
        filterOutMovesThatLeaveKingInCheck({
          pieces,
          history,
          moves,
        });

      setPossibleMoves(movesWithoutLeavingTheKingOnCheck);
    },
    [pieces, getMoves, isWhiteTurn, history, kingOnCheck],
  );

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className="grid w-max auto-rows-fr grid-cols-8">
        {Array.from(Array(64)).map((_, key) => {
          const piece = pieces.find(
            (piece) => piece.position.x + piece.position.y * 8 === key,
          );

          const thisSquare = { x: key % 8, y: Math.floor(key / 8) };

          let typeOfSquare: "edible" | "highlighted" | "normal" = "normal";
          let move: Move | undefined = undefined;

          for (const possibleMove of possibleMoves) {
            if (
              posEquals(possibleMove.to, thisSquare) &&
              !possibleMove.capturing
            ) {
              typeOfSquare = "highlighted";
              move = possibleMove;
              break;
            }

            if (
              posEquals(possibleMove.to, thisSquare) &&
              possibleMove.capturing
            ) {
              typeOfSquare = "edible";
              move = possibleMove;
              break;
            }
          }

          let isThisKingOnCheck = false;
          if (
            piece &&
            kingOnCheck === "white" &&
            piece.isWhite &&
            piece.type === "k"
          ) {
            isThisKingOnCheck = true;
          }

          if (
            piece &&
            kingOnCheck === "black" &&
            !piece.isWhite &&
            piece.type === "k"
          ) {
            isThisKingOnCheck = true;
          }

          return (
            <button
              key={`piece-${key}`}
              className={`flex h-[5rem] w-[5rem] items-center justify-center p-2 ${
                typeOfSquare === "edible"
                  ? "bg-red-500"
                  : typeOfSquare === "highlighted"
                  ? "bg-green-500 hover:cursor-pointer"
                  : isThisKingOnCheck
                  ? "bg-orange-500"
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
                handleCellClick({ piece, move });
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
