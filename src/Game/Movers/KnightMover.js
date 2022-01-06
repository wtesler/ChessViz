import AbstractSpecifierPieceMover from "./Abstract/AbstractSpecifierPieceMover";
import {KNIGHT} from "../../Constants/pieces";

export default class KnightMover extends AbstractSpecifierPieceMover {
  constructor() {
    super();
    this.setVerbose(false);
  }

  move(board, player, notation) {
    const [targetCol, targetRow] = super.getTargetColRow(notation);

    const targetSquare = board[targetCol][targetRow];

    const squareInfos = this.discoverKnightsAtPoints(board, player, targetCol, targetRow);

    const currentSquare = super.choosePieceSquareFromSquareInfos(squareInfos, notation);

    super.movePiece(currentSquare, targetSquare);
  }

  /**
   * Check the 8 possible squares that the knight can jump to. Add any candidate knights found.
   */
  discoverKnightsAtPoints(board, player, targetCol, targetRow) {
    const squareInfos = [];
    this.addKnightIfAtPoint(board, player, targetCol + 1, targetRow + 2, squareInfos);
    this.addKnightIfAtPoint(board, player, targetCol + 1, targetRow - 2, squareInfos);
    this.addKnightIfAtPoint(board, player, targetCol - 1, targetRow + 2, squareInfos);
    this.addKnightIfAtPoint(board, player, targetCol - 1, targetRow - 2, squareInfos);
    this.addKnightIfAtPoint(board, player, targetCol + 2, targetRow + 1, squareInfos);
    this.addKnightIfAtPoint(board, player, targetCol + 2, targetRow - 1, squareInfos);
    this.addKnightIfAtPoint(board, player, targetCol - 2, targetRow + 1, squareInfos);
    this.addKnightIfAtPoint(board, player, targetCol - 2, targetRow - 1, squareInfos);
    return squareInfos;
  }

  addKnightIfAtPoint(board, player, col, row, squareInfos) {
    if (col < 0 || col >= 8) {
      return;
    }
    if (row < 0 || row >= 8) {
      return;
    }
    const square = board[col][row];
    const piece = square.getPiece();
    if (!piece) {
      return;
    }
    if (piece.getType() !== KNIGHT || piece.getPlayer() !== player) {
      return;
    }
    squareInfos.push([square, col, row]);
  }
}
