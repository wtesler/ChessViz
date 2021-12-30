import {WHITE} from "../Constants/players";
import PieceInfo from "./PieceInfo";
import {KING, ROOK} from "../Constants/pieces";

export default class MoveMaker {

  constructor(boardState) {
    this.boardState = boardState;
  }

  makeMove(move) {
    console.log(move);

    const notation = move.notation;
    const player = move.player;

    if (notation === 'O-O' || notation === 'O-O-O') {
      this.doCastle(notation, player);
    }
  }

  doCastle(notation, player) {
    const row = player === WHITE ? 0 : 7;
    const curRookCol = notation === 'O-O' ? 7 : 0;
    const newKingCol = notation === 'O-O' ? 6 : 2;
    const newRookCol = notation === 'O-O' ? 5 : 3;

    const currentKingSquareState = this.boardState[4][row];
    const currentRookSquareState = this.boardState[curRookCol][row];

    const newKingSquareState = this.boardState[newKingCol][row];
    const newRookSquareState = this.boardState[newRookCol][row];

    currentKingSquareState.clearPiece()
    currentRookSquareState.clearPiece();
    newKingSquareState.setPiece(new PieceInfo(KING, player))
    newRookSquareState.setPiece(new PieceInfo(ROOK, player))
  }
}