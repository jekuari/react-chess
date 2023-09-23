import { Piece } from "./Chessboard";
import {
  makeBishop,
  makeKing,
  makeKnight,
  makePawn,
  makeQueen,
  makeRook,
} from "./Makers";

export const getPieceByPosition = (position: number[], pieces: Piece[]) => {
  return pieces.find(
    (piece) => posEquals(piece.position, position) && !piece.isDead,
  );
};

export const posEquals = (pos1: number[], pos2: number[]) => {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

export const makeBoard = () => {
  return [
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
  ];
};
