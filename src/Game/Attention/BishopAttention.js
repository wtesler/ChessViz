import AbstractLinePieceAttention from "./Abstract/AbstractLinePieceAttention";

export default class BishopAttention extends AbstractLinePieceAttention {
  update(board, col, row, player) {
    this.addAttentionAlongLine(board, col, row, 1, 1, player);
    this.addAttentionAlongLine(board, col, row, 1, -1, player);
    this.addAttentionAlongLine(board, col, row, -1, 1, player);
    this.addAttentionAlongLine(board, col, row, -1, -1, player);
  }
}