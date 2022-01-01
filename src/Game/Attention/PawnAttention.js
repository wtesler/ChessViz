import AbstractPieceAttention from "./Abstract/AbstractPieceAttention";
import {WHITE} from "../../Constants/players";

export default class PawnAttention extends AbstractPieceAttention {
  update(board, col, row, player) {
    const rowOffset = player === WHITE ? 1 : -1;
    this.addAttentionToSquare(board, col - 1, row + rowOffset, player);
    this.addAttentionToSquare(board, col + 1, row + rowOffset, player);
  }
}