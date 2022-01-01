import AbstractPieceAttention from "./AbstractPieceAttention";

export default class AbstractLinePieceAttention extends AbstractPieceAttention {
  addAttentionAlongLine(board, col, row, directionCol, directionRow, player) {
    const newCol = col + directionCol;
    const newRow = row + directionRow;
    if (newCol < 0 || newCol >= 8) {
      return;
    }
    if (newRow < 0 || newRow >= 8) {
      return;
    }

    const square = board[newCol][newRow];
    const piece = square.getPiece();

    square.addAttention(player);

    if (!piece) {
      this.addAttentionAlongLine(board, newCol, newRow, directionCol, directionRow, player);
    }
  }
}