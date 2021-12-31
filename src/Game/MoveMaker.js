import CastleMover from "./Movers/CastleMover";
import PawnMover from "./Movers/PawnMover";

export default class MoveMaker {

  constructor(boardState) {
    this.boardState = boardState;
    this.castleMover = new CastleMover(this.boardState);
    this.pawnMover = new PawnMover(this.boardState);
  }

  makeMove(move) {
    console.log(`${move.number} | ${move.player} | ${move.notation} | ${move.strippedNotation}`);

    const player = move.player;
    const notation = move.strippedNotation;

    if (notation.startsWith('O')) {
      this.castleMover.move(notation, player);
    } else if (notation[0] === notation[0].toLowerCase()) {
      this.pawnMover.move(notation, player);
    }
  }
}
