import AbstractPieceAttention from "./Abstract/AbstractPieceAttention";

export default class KnightAttention extends AbstractPieceAttention {
  update(board, col, row, player) {
    this.addAttentionToSquare(board, col + 1, row + 2, player);
    this.addAttentionToSquare(board, col + 1, row - 2, player);
    this.addAttentionToSquare(board, col + 2, row + 1, player);
    this.addAttentionToSquare(board, col + 2, row - 1, player);
    this.addAttentionToSquare(board, col - 1, row + 2, player);
    this.addAttentionToSquare(board, col - 1, row - 2, player);
    this.addAttentionToSquare(board, col - 2, row - 1, player);
    this.addAttentionToSquare(board, col - 2, row + 1, player);
  }
}