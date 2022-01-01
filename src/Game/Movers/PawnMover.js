import AbstractPieceMover from "./Abstract/AbstractPieceMover";
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
    this.setVerbose(false);
  }

  move(board, player, notation) {
    const firstChar = notation[0];
    const secondChar = notation[1];
    const thirdChar = notation[2];
    const fourthChar = notation[3];

    const currentColumn = COLUMN_MAP[firstChar];

    const isNormalForward = notation.length === 2;
    const isCapturing = notation.length === 3;
    const isPromoting = notation.length === 4;

    let targetRow;
    let targetCol;
    if (isNormalForward || isPromoting) {
      targetRow = ROW_MAP[secondChar];
      targetCol = currentColumn;
    } else {
      targetRow = ROW_MAP[thirdChar];
      targetCol = COLUMN_MAP[secondChar];
    }

    const currentRow = this.scanColumnForPawnRow(board, currentColumn, targetRow, player);

    const currentSquare = board[currentColumn][currentRow];
    const targetSquare = board[targetCol][targetRow];

    super.log(`Moving pawn from ${toChessCoordinates(currentColumn, currentRow)} to ${toChessCoordinates(targetCol, targetRow)}.`);

    if (isCapturing && !targetSquare.piece) { // EN PASSANT
      const opponentCol = targetCol;
      const opponentRow = currentRow;
      const opponentSquare = board[opponentCol][opponentRow];
      opponentSquare.clearPiece();
      super.log("en passant.");
    }

    super.movePiece(currentSquare, targetSquare);

    if (isPromoting) {
      targetSquare.getPiece().setType(fourthChar);
    }
  }

  /**
   * Scans across the given column to find the pawn that can validly move to the given row.
   *
   * We start from the player's far side.
   *
   * Imagine a situation where two pawns are stacked vertically.
   *
   * @return Number the row index of the pawn for the given user which can validly move to the target col/row.
   */
  scanColumnForPawnRow(board, targetCol, targetRow, player) {
    const isWhite = player === WHITE;
    const startRow = isWhite ? 7 : 0;
    const searchDirection = isWhite ? -1 : 1;
    const moveDirection = isWhite ? 1 : -1;

    // super.log(`Scanning column starting from square ${toChessCoordinates(targetCol, startRow)}`);

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

      const canJumpForwardOnceToTarget = row + (1 * moveDirection) === targetRow;
      const canJumpForwardTwiceToTarget = row + (2 * moveDirection) === targetRow;

      if (canJumpForwardOnceToTarget || canJumpForwardTwiceToTarget) {
        // super.log(`Found Pawn at ${toChessCoordinates(targetCol, row)}`);
        return row;
      }
    }

    throw new Error("No valid pawn was found on the given column. Is there a problem with the PGN?");
  }
}
