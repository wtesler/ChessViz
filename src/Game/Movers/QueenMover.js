import AbstractLinePieceMover from "./Abstract/AbstractLinePieceMover";
import {QUEEN} from "../../Constants/pieces";

export default class QueenMover extends AbstractLinePieceMover {
  constructor() {
    super();
    this.setVerbose(false);
  }

  move(board, player, notation) {
    const [targetCol, targetRow] = super.getTargetColRow(notation);

    const targetSquare = board[targetCol][targetRow];

    const squareInfos = this.discoverQueensAlongLines(board, player, targetCol, targetRow);

    const currentSquare = super.choosePieceSquareFromSquareInfos(squareInfos, notation);

    super.movePiece(currentSquare, targetSquare);
  }

  discoverQueensAlongLines(board, player, targetCol, targetRow) {
    const squareInfos = [];

    // Diagonals
    super.discoverInDirection(board, targetCol, targetRow, 1, 1, QUEEN, player, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, 1, -1, QUEEN, player, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, -1, 1, QUEEN, player, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, -1, -1, QUEEN, player, squareInfos);

    // Straight Lines
    super.discoverInDirection(board, targetCol, targetRow, 0, 1, QUEEN, player, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, 0, -1, QUEEN, player, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, 1, 0, QUEEN, player, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, -1, 0, QUEEN, player, squareInfos);

    return squareInfos;
  }
}
