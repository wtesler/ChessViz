import AbstractPieceMover from "./Abstract/AbstractPieceMover";
import {WHITE} from "../../Constants/players";

export default class CastleMover extends AbstractPieceMover {
  constructor() {
    super();
    this.setVerbose(true); // Useful for testing.
  }

  move(board, player, notation) {
    const isShortCastle = notation.length === 3;

    const backRow = player === WHITE ? 0 : 7;
    const curRookCol = isShortCastle ? 7 : 0;

    const targetKingCol = isShortCastle ? 6 : 2;
    const targetRookCol = isShortCastle ? 5 : 3;

    // Move King
    const currentKingSquare = board[4][backRow];
    const targetKingSquare = board[targetKingCol][backRow];
    super.movePiece(currentKingSquare, targetKingSquare);

    // Move Rook
    const currentRookSquare = board[curRookCol][backRow];
    const targetRookSquare = board[targetRookCol][backRow];
    super.movePiece(currentRookSquare, targetRookSquare);
  }
}
