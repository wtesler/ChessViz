/**
 * The state of a square including it's current piece and focus.
 */
export default class Square {
  constructor(piece=null, whiteAttention=0, blackAttention=0) {
    this.piece = piece;
    this.attention = {
      white: whiteAttention,
      black: blackAttention
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

  clearAttention() {
    this.attention = {
      white: 0,
      black: 0
    };
  }
}
