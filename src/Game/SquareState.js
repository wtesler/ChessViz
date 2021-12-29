/**
 * The state of a square including it's current piece and focus.
 */
export default class SquareState {
  constructor(piece='', whiteFocus=0, blackFocus=0) {
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

  getPiece() {
    return this.piece;
  }

  setPiece(piece) {
    this.piece = piece;
  }

  clearPiece() {
    this.piece = '';
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
