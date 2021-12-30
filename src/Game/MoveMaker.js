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

    if (notation === 'O-O') {
      const row = player === WHITE ? 0 : 7;
      const currentKingSquareState = this.boardState[4][row];
      const currentRookSquareState = this.boardState[7][row];
      const newKingSquareState = this.boardState[6][row];
      const newRookSquareState = this.boardState[5][row];
      currentKingSquareState.clearPiece()
      currentRookSquareState.clearPiece();
      newKingSquareState.setPiece(new PieceInfo(KING, player))
      newRookSquareState.setPiece(new PieceInfo(ROOK, player))
    } else if (notation === 'O-O-O') {
      const row = player === WHITE ? 0 : 7;
      const currentKingSquareState = this.boardState[4][row];
      const currentRookSquareState = this.boardState[0][row];
      const newKingSquareState = this.boardState[2][row];
      const newRookSquareState = this.boardState[3][row];
      currentKingSquareState.clearPiece()
      currentRookSquareState.clearPiece();
      newKingSquareState.setPiece(new PieceInfo(KING, player))
      newRookSquareState.setPiece(new PieceInfo(ROOK, player))
    }
  }
}