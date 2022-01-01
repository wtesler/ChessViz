import AbstractLinePieceAttention from "./Abstract/AbstractLinePieceAttention";

export default class RookAttention extends AbstractLinePieceAttention {
  update(board, col, row, player) {
    this.addAttentionAlongLine(board, col, row, 1, 0, player);
    this.addAttentionAlongLine(board, col, row, 0, 1, player);
    this.addAttentionAlongLine(board, col, row, -1, 0, player);
    this.addAttentionAlongLine(board, col, row, 0, -1, player);
  }
}