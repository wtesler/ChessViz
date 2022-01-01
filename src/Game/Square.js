/**
 * The state of a square including it's current piece and attention.
 */
import {BLACK, WHITE} from "../Constants/players";

export default class Square {
  constructor(piece=null, whiteAttention=0, blackAttention=0) {
    this.piece = piece;
    this.attention = {
      [WHITE]: whiteAttention,
      [BLACK]: blackAttention
    };
  }

  clear() {
    this.clearPiece();
    this.clearAttention();
  }

  /**
   * Returns the Piece object or null if no piece on square.
   */
  getPiece() {
    return this.piece;
  }

  /**
   * Sets the Piece object.
   */
  setPiece(piece) {
    this.piece = piece;
  }

  /**
   * Unsets the Piece Object
   */
  clearPiece() {
    this.piece = null;
  }

  getAttention() {
    return this.attention;
  }

  addAttention(player) {
    this.attention[player]++;
  }

  clearAttention() {
    this.attention = {
      [WHITE]: 0,
      [BLACK]: 0
    };
  }
}
