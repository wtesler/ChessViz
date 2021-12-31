/**
 * The state of a square including it's current piece and focus.
 */
export default class SquareState {
  constructor(piece=null, whiteFocus=0, blackFocus=0) {
    this.piece = piece;
    this.focus = {
      white: whiteFocus,
      black: blackFocus
    };
  }

  clear() {
    this.clearPiece();
    this.clearFocus();
  }

  /**
   * Returns PieceInfo object.
   */
  getPiece() {
    return this.piece;
  }

  /**
   * Sets PieceInfo object.
   */
  setPiece(piece) {
    this.piece = piece;
  }

  clearPiece() {
    this.piece = null;
  }

  getFocus() {
    return this.focus;
  }

  clearFocus() {
    this.focus = {
      white: 0,
      black: 0
    };
  }
}
