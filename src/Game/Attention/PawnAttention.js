import AbstractPieceAttention from "./Abstract/AbstractPieceAttention";
import {WHITE} from "../../Constants/players";

export default class PawnAttention extends AbstractPieceAttention {
  update(board, col, row, player) {
    const rowOffset = player === WHITE ? 1 : -1;
    this._addAttentionToSquare(board, col - 1, row + rowOffset, player);
    this._addAttentionToSquare(board, col + 1, row + rowOffset, player);
  }

  _addAttentionToSquare(board, col, row, player) {
    if (col < 0 || col >= 8) {
      return;
    }
    if (row < 0 || row >= 8) {
      return;
    }
    board[col][row].addAttention(player);
  }
}