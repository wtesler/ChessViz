import AbstractMover from "./AbstractMover";
import {WHITE} from "../../Constants/players";

export default class CastleMover extends AbstractMover {
  constructor(boardState) {
    super(boardState);
    this.setVerbose(true); // Useful for testing.
  }

  move(notation, player) {
    const isShortCastle = notation === 'O-O';

    const backRow = player === WHITE ? 0 : 7;
    const curRookCol = isShortCastle ? 7 : 0;

    const targetKingCol = isShortCastle ? 6 : 2;
    const targetRookCol = isShortCastle ? 5 : 3;

    // Move King
    const currentKingSquare = this.boardState[4][backRow];
    const targetKingSquare = this.boardState[targetKingCol][backRow];
    super.movePiece(currentKingSquare, targetKingSquare);

    // Move Rook
    const currentRookSquare = this.boardState[curRookCol][backRow];
    const targetRookSquare = this.boardState[targetRookCol][backRow];
    super.movePiece(currentRookSquare, targetRookSquare);
  }
}
