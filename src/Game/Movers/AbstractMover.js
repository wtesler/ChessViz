import {COLUMN_MAP_INVERSE, ROW_MAP_INVERSE} from "../Coordinates/CoordinateMaps";

/**
 * Movers which extend this abstract mover should implement the `move` method.
 *
 * Some useful methods provided by this class include `isSquareOccupied` and `log`
 * which allows for turning logs on and off for debugging and validation.
 *
 */
export default class AbstractMover {

  _verbose = false;

  constructor(boardState) {
    this.boardState = boardState;
  }

  // Abstract Method.
  move(notation, player) {
    throw new Error("Must implement this method.");
  }

  movePiece(currentSquareState, targetSquareState) {
    const pieceInfo = currentSquareState.getPiece();
    currentSquareState.clearPiece()
    targetSquareState.setPiece(pieceInfo);
  }

  isSquareOccupied(col, row) {
    return Boolean(this.boardState[col][row].piece);
  }

  /**
   * Utility which converts col/row indices back into chess-readable coordinates.
   */
  toChessCoordinates(col, row) {
    return `${COLUMN_MAP_INVERSE[col]}${ROW_MAP_INVERSE[row]}`
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
