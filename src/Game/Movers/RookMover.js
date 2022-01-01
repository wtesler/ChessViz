import AbstractLinePieceMover from "./Abstract/AbstractLinePieceMover";
import {ROOK} from "../../Constants/pieces";

export default class RookMover extends AbstractLinePieceMover {
  constructor() {
    super();
    this.setVerbose(false);
  }

  move(board, player, notation) {
    const [targetCol, targetRow] = super.getTargetColRow(notation);

    const targetSquare = board[targetCol][targetRow];

    const squareInfos = this.discoverRooksAlongLines(board, player, targetCol, targetRow);

    const currentSquare = super.choosePieceSquareFromSquareInfos(squareInfos, notation);

    super.movePiece(currentSquare, targetSquare);
  }

  discoverRooksAlongLines(board, player, targetCol, targetRow) {
    const squareInfos = [];
    super.discoverInDirection(board, targetCol, targetRow, 0, 1, ROOK, player, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, 0, -1, ROOK, player, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, 1, 0, ROOK, player, squareInfos);
    super.discoverInDirection(board, targetCol, targetRow, -1, 0, ROOK, player, squareInfos);
    return squareInfos;
  }
}
