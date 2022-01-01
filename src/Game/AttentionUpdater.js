import {BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK} from "../Constants/pieces";
import PawnAttention from "./Attention/PawnAttention";
import BishopAttention from "./Attention/BishopAttention";
import RookAttention from "./Attention/RookAttention";
import QueenAttention from "./Attention/QueenAttention";
import KingAttention from "./Attention/KingAttention";
import KnightAttention from "./Attention/KnightAttention";

export default class AttentionUpdater {
  constructor() {
    this.attendants = {
      [PAWN]: new PawnAttention(),
      [BISHOP]: new BishopAttention(),
      [ROOK]: new RookAttention(),
      [QUEEN]: new QueenAttention(),
      [KING]: new KingAttention(),
      [KNIGHT]: new KnightAttention(),
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