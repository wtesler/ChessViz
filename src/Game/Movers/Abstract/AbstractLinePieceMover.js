import {toChessCoordinates} from "../../Coordinates/CoordinateMaps";
import AbstractSpecifierPieceMover from "./AbstractSpecifierPieceMover";

/**
 * Methods useful for pieces which move in full lines.
 *
 * Used by Bishop, Rook, and Queen.
 */
export default class AbstractLinePieceMover extends AbstractSpecifierPieceMover {

  /**
   * Moves in the given direction and checks for the given piece type on each square.
   * Moves recursively until a different piece or a boundary is encountered.
   *
   * If the piece of the proper type is found, adds it's square as well as the [col, row] where it was found.
   */
  discoverInDirection(board, curCol, curRow, directionCol, directionRow, type, player, squares) {
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
      if (piece.getType() === type && piece.getPlayer() === player) {
        super.log(`Found ${type} on ${chessCoords}.`);
        squares.push([square, newCol, newRow]);
      } else {
        return;
      }
    }

    this.discoverInDirection(board, newCol, newRow, directionCol, directionRow, type, player, squares);
  }
}
