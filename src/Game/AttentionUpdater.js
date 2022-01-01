import {BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK} from "../Constants/pieces";
import PawnAttention from "./Attention/PawnAttention";
import BishopAttention from "./Attention/BishopAttention";
import RookAttention from "./Attention/RookAttention";
import QueenAttention from "./Attention/QueenAttention";
import KingAttention from "./Attention/KingAttention";
import KnightAttention from "./Attention/KnightAttention";
import {BLACK, WHITE} from "../Constants/players";

export default class AttentionUpdater {
  MAX_THEORETICAL_ATTENTION = 15; // Theoretical max attention on a single square.
  MAX_AESTHETIC_ATTENTION = 6; // Practical max attention on a single square.

  constructor() {
    this.attendants = {
      [PAWN]: new PawnAttention(),
      [BISHOP]: new BishopAttention(),
      [ROOK]: new RookAttention(),
      [QUEEN]: new QueenAttention(),
      [KING]: new KingAttention(),
      [KNIGHT]: new KnightAttention(),
    }

    this.isNormalized = false;
  }

  update(board) {
    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 8; row++) {
        board[col][row].clearAttention();
      }
    }

    let maxAttention = -1;

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
          const square = board[col][row];
          const attention = square.getAttention();
          maxAttention = Math.max(maxAttention, attention[WHITE]);
          maxAttention = Math.max(maxAttention, attention[BLACK]);
        }
      }
    }

    const divisor = this.isNormalized ? maxAttention : this.MAX_AESTHETIC_ATTENTION;
    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 8; row++) {
        const square = board[col][row];
        const attention = square.getAttention();
        const whiteAttention = Math.min(attention[WHITE] / divisor, 1);
        const blackAttention = Math.min(attention[BLACK] / divisor, 1);
        square.setAttention(WHITE, whiteAttention);
        square.setAttention(BLACK, blackAttention);
      }
    }
  }
}