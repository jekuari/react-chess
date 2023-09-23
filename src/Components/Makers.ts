import { Piece } from "./Chessboard";
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

export const makeKnight = (position: number[], isWhite: boolean) => {
  const knight: Piece = {
    image: isWhite ? imgKnightLight : imgKnightDark,
    position: position,
    isWhite,
    isDead: false,
    type: "n",
    moves: [],
  };
  return knight;
};

export const makeBishop = (position: number[], isWhite: boolean) => {
  const bishop: Piece = {
    image: isWhite ? imgBishopLight : imgBishopDark,
    position: position,
    isWhite,
    isDead: false,
    type: "b",
    moves: [],
  };
  return bishop;
};

export const makePawn = (position: number[], isWhite: boolean) => {
  const pawn: Piece = {
    image: isWhite ? imgPawnLight : imgPawnDark,
    position: position,
    isWhite,
    isDead: false,
    type: "p",
    moves: [],
  };
  return pawn;
};

export const makeKing = (position: number[], isWhite: boolean) => {
  const king: Piece = {
    image: isWhite ? imgKingLight : imgKingDark,
    position: position,
    isWhite,
    isDead: false,
    type: "k",
    moves: [],
  };
  return king;
};

export const makeRook = (position: number[], isWhite: boolean) => {
  const rook: Piece = {
    image: isWhite ? imgTowerLight : imgTowerDark,
    position: position,
    isWhite,
    isDead: false,
    type: "r",
    moves: [],
  };
  return rook;
};
export const makeQueen = (position: number[], isWhite: boolean) => {
  const queen: Piece = {
    image: isWhite ? imgQueenLight : imgQueenDark,
    position: position,
    isWhite,
    isDead: false,
    type: "q",
    moves: [],
  };
  return queen;
};
