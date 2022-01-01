export default class AbstractPieceAttention {
  update(board, col, row, player) {

  }

  addAttentionToSquare(board, col, row, player) {
    if (col < 0 || col >= 8) {
      return;
    }
    if (row < 0 || row >= 8) {
      return;
    }
    board[col][row].addAttention(player);
  }
}