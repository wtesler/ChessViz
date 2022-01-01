import AbstractLinePieceAttention from "./Abstract/AbstractLinePieceAttention";

export default class QueenAttention extends AbstractLinePieceAttention {
  update(board, col, row, player) {
    // Diagonal
    this.addAttentionAlongLine(board, col, row, 1, 1, player);
    this.addAttentionAlongLine(board, col, row, 1, -1, player);
    this.addAttentionAlongLine(board, col, row, -1, 1, player);
    this.addAttentionAlongLine(board, col, row, -1, -1, player);

    // Straight
    this.addAttentionAlongLine(board, col, row, 1, 0, player);
    this.addAttentionAlongLine(board, col, row, 0, 1, player);
    this.addAttentionAlongLine(board, col, row, -1, 0, player);
    this.addAttentionAlongLine(board, col, row, 0, -1, player);
  }
}