import {COLUMN_MAP, ROW_MAP, toArrayCoordinates, toChessCoordinates} from "../../Coordinates/CoordinateMaps";
import AbstractPieceMover from "./AbstractPieceMover";

/**
 * Abstract Line Piece Mover has methods useful for pieces which move in full lines.
 *
 * Used by Bishop, Rook, and Queen.
 */
export default class AbstractLinePieceMover extends AbstractPieceMover {

  /**
   * Moves in the given direction and checks for the given piece type on each square.
   * Moves recursively until a different piece or a boundary is encountered.
   *
   * If the piece of the proper type is found, adds it's square as well as the [col, row] where it was found.
   */
  discoverInDirection(board, curCol, curRow, directionCol, directionRow, type, squares) {
    const newCol = curCol + directionCol;
    const newRow = curRow + directionRow;
    if (newCol < 0 || newCol >= 8) {
      return;
    }
    if (newRow < 0 || newRow >= 8) {
      return;
    }

    const chessCoords = toChessCoordinates(newCol, newRow);

    super.log(`Checking for ${type} on ${chessCoords}.`);

    const square = board[newCol][newRow];
    const piece = square.getPiece();
    if (piece) {
      if (piece.getType() === type) {
        super.log(`Found ${type} on ${chessCoords}.`);
        squares.push([square, newCol, newRow]);
      } else {
        return;
      }
    }

    this.discoverInDirection(board, newCol, newRow, directionCol, directionRow, type, squares);
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

  getTargetColRow(notation) {
    const secondChar = notation[1];
    const thirdChar = notation[2];
    const fourthChar = notation[3];

    const specifier = this._getSpecifier(notation);

    return toArrayCoordinates(specifier ? thirdChar : secondChar, specifier ? fourthChar : thirdChar);
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
