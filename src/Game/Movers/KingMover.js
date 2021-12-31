import AbstractPieceMover from "./AbstractPieceMover";
import {toArrayCoordinates} from "../Coordinates/CoordinateMaps";
import {KING} from "../../Constants/pieces";

export default class PawnMover extends AbstractPieceMover {
  constructor() {
    super();
    this.setVerbose(true);
  }

  move(board, player, notation) {
    const rank = notation[1];
    const file = notation[2];

    const [targetCol, targetRow] = toArrayCoordinates(rank, file);

    const currentKingSquare = this.findKingSquare(board, targetCol, targetRow);
    const targetKingSquare = board[targetCol][targetRow];

    super.movePiece(currentKingSquare, targetKingSquare);
  }

  /**
   * Do a 3x3 search around the target coordinates for the king (excluding the center square).
   */
  findKingSquare(board, targetCol, targetRow) {
    let kingSquare = null;
    for (let i = -1; i <= 1; i++) { // Notice -1 to 1
      if (kingSquare) {
        break;
      }
      for (let j = -1; j <= 1; j++) {  // Notice -1 to 1
        if (i === 0 && j === 0) {
          continue; // Exclude center.
        }
        const colOffsetIndex = targetCol + i;
        const rowOffsetIndex = targetRow + j;
        if (colOffsetIndex < 0 || colOffsetIndex >= 8) {
          continue; // Out of bounds.
        }
        if (rowOffsetIndex < 0 || rowOffsetIndex >= 8) {
          continue; // Out of bounds.
        }
        const square = board[colOffsetIndex][rowOffsetIndex];
        const piece = square.getPiece();
        if (!piece) {
          continue;
        }
        if (piece.type !== KING) {
          continue;
        }
        kingSquare = square;
        break;
      }
    }
    if (!kingSquare) {
      throw new Error("Couldn't find king for the given move. Is the PGN improper?");
    }
    return kingSquare;
  }
}
