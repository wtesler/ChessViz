import AbstractLinePieceMover from "./Abstract/AbstractLinePieceMover";
import {BISHOP} from "../../Constants/pieces";

export default class BishopMover extends AbstractLinePieceMover {
  constructor() {
    super();
    this.setVerbose(false);
  }

  move(board, player, notation) {
    const [targetCol, targetRow] = super.getTargetColRow(notation);

    const targetSquare = board[targetCol][targetRow];

    const squareInfos = this.discoverBishopsAlongDiagonals(board, targetCol, targetRow);

    const currentSquare = super.choosePieceSquareFromSquareInfos(squareInfos, notation);

    super.movePiece(currentSquare, targetSquare);
  }

  discoverBishopsAlongDiagonals(board, targetCol, targetRow) {
    const squareInfos = [];
    super.discoverInDirection(board, targetCol, targetRow, 1, 1, BISHOP, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, 1, -1, BISHOP, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, -1, 1, BISHOP, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, -1, -1, BISHOP, squareInfos);
    return squareInfos;
  }
}
