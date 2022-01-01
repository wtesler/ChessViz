import {COLUMN_MAP, ROW_MAP, toArrayCoordinates} from "../../Coordinates/CoordinateMaps";
import AbstractPieceMover from "./AbstractPieceMover";

/**
 * Methods useful for pieces which can have multiples (Excluding pawns).
 *
 * Handles notation that may have a specifier on it.
 *
 * Used directly by Knights and indirectly by Rooks, Bishops, and Queens.
 */
export default class AbstractSpecifierPieceMover extends AbstractPieceMover {

  /**
   * Returns the target coordinates of the given notation.
   */
  getTargetColRow(notation) {
    const secondChar = notation[1];
    const thirdChar = notation[2];
    const fourthChar = notation[3];

    const specifier = this._getSpecifier(notation);

    return toArrayCoordinates(specifier ? thirdChar : secondChar, specifier ? fourthChar : thirdChar);
  }

  /**
   * Given a list of candidate square infos which each look like [square, col, row],
   * choose the one which satisfies the notation. If there is no specifier, it is the first candidate.
   * If there is a specifier, it is either a rank or file specifier and we can use our square info
   * to find the right candidate.
   *
   * Returns the square.
   */
  choosePieceSquareFromSquareInfos(squareInfos, notation) {
    if (squareInfos.length === 0) {
      throw new Error("Did not discover any candidate pieces. Is the PGN correct?");
    }

    const specifier = this._getSpecifier(notation);

    let pieceSquare;
    if (specifier) {
      for (const squareInfo of squareInfos) { // Choose the piece which satisfys the specifier.
        const square = squareInfo[0];
        const col = squareInfo[1];
        const row = squareInfo[2];
        if (col === COLUMN_MAP[specifier] || row === ROW_MAP[specifier]) {
          pieceSquare = square;
          break;
        }
      }
      if (!pieceSquare) {
        throw new Error("Notation had extra specifier but no piece found which satisfies it.");
      }
    } else {
      pieceSquare = squareInfos[0][0];
    }
    return pieceSquare;
  }

  /**
   * Returns the char of the specifier (rank or file) of the move or null if one is not needed.
   */
  _getSpecifier(notation) {
    const secondChar = notation[1];
    const hasExtraSpecifier = notation.length === 4;
    return hasExtraSpecifier ? secondChar : null;
  }
}
