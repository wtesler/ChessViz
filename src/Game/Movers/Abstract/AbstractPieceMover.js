/**
 * Abstract Piece Mover has methods useful for piece movers.
 *
 * Movers implement 'move'.
 *
 * A useful method of this class is `movePiece` which moves a piece.
 *
 * Dev Notes: If you create a new mover, hook it up to the `MoveMaker`.
 *
 */
export default class AbstractPieceMover {

  _verbose = false;

  // Implement This. Alters the board for the given player with the given notation.
  move(board, player, notation) {
    throw new Error("Must implement this method.");
  }

  /**
   * Moves the piece from one square to another square.
   */
  movePiece(srcSquare, targetSquare) {
    const piece = srcSquare.getPiece();
    if (!piece) {
      throw new Error("No piece on the current square.")
    }
    srcSquare.clearPiece()
    targetSquare.setPiece(piece);
  }

  setVerbose(isVerbose) {
    this._verbose = isVerbose;
  }

  log(msg) {
    if (!this._verbose) {
      return;
    }
    console.log(msg);
  }
}
