import AbstractPieceAttention from "./Abstract/AbstractPieceAttention";

export default class KingAttention extends AbstractPieceAttention {
  update(board, col, row, player) {
    this.addAttentionToSquare(board, col + 1, row - 1, player);
    this.addAttentionToSquare(board, col + 1, row, player);
    this.addAttentionToSquare(board, col + 1, row + 1, player);
    this.addAttentionToSquare(board, col, row - 1, player);
    this.addAttentionToSquare(board, col, row + 1, player);
    this.addAttentionToSquare(board, col - 1, row - 1, player);
    this.addAttentionToSquare(board, col - 1, row, player);
    this.addAttentionToSquare(board, col - 1, row + 1, player);
  }
}