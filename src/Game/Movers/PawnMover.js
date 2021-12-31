import AbstractPieceMover from "./AbstractPieceMover";
import {
  COLUMN_MAP,
  ROW_MAP,
  toChessCoordinates
} from "../Coordinates/CoordinateMaps";
import {WHITE} from "../../Constants/players";
import {PAWN} from "../../Constants/pieces";

export default class PawnMover extends AbstractPieceMover {
  constructor() {
    super();
    this.setVerbose(true);
  }

  move(board, player, notation) {
    if (notation.length === 2) {
      const targetCol = COLUMN_MAP[notation[0]];
      const targetRow = ROW_MAP[notation[1]];

      const correctPawn = this.scanColumnForPawn(board, targetCol, targetRow, player);

      const currentPawnSquare = board[targetCol][correctPawn];
      const targetPawnSquare = board[targetCol][targetRow];

      super.movePiece(currentPawnSquare, targetPawnSquare);

    } else if (notation.length === 3) {
      console.warn("Pawn moves with notation length greater than 2 are not supported yet");
    } else {
      console.warn("Pawn moves with notation length greater than 3 are not supported yet");
    }
  }

  /**
   * Scans across the given column to find the pawn that can validly move to the given row.
   *
   * Imagine a situation where two pawns are stacked vertically, and one may jump forward 2 squares.
   * That is why we need this calculation.
   *
   * @return Number the row of the pawn for the given user which can validly move to the target col/row.
   */
  scanColumnForPawn(board, targetCol, targetRow, player) {
    const isWhite = player === WHITE;
    const startRow = isWhite ? 7 : 0;
    const searchDirection = isWhite ? -1 : 1;
    const moveDirection = isWhite ? 1 : -1;

    super.log(`Scanning column starting from square ${toChessCoordinates(targetCol, startRow)}`);

    for (let row = startRow; row >= 0 || row < 8; row += searchDirection) {
      const square = board[targetCol][row];
      const pieceInfo = square.getPiece();
      if (!pieceInfo) {
        continue; // Square is empty.
      }
      if (pieceInfo.type !== PAWN) {
        continue; // Not a pawn.
      }
      if (pieceInfo.player !== player) {
        continue; // Not our piece.
      }

      super.log(`Found Pawn at ${toChessCoordinates(targetCol, row)}`);

      // Can the pawn jump forwards 1 square to the target row?
      if (row + (1 * moveDirection) === targetRow) {
        return row;
      }

      // Can the pawn jump forwards 2 squares to the target row?
      if (row + (2 * moveDirection) === targetRow) {
        return row;
      }

      super.log(`Pawn could not move to the target coordinates.`);
    }

    throw new Error("No candidate was found for move. Is there a problem with the PGN?");
  }
}
