import {PAWN} from "../Constants/pieces";
import PawnAttention from "./Attention/PawnAttention";

export default class AttentionUpdater {
  constructor() {
    this.attendants = {
      [PAWN]: new PawnAttention()
    }
  }

  update(board) {
    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 8; row++) {
        board[col][row].clearAttention();
      }
    }

    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 8; row++) {
        const square = board[col][row];
        const piece = square.getPiece();
        if (!piece) {
          continue;
        }
        const attendant = this.attendants[piece.getType()];
        if (attendant) {
          attendant.update(board, col, row, piece.getPlayer());
        }
      }
    }
  }
}