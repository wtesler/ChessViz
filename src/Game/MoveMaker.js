import CastleMover from "./Movers/CastleMover";
import PawnMover from "./Movers/PawnMover";
import KingMover from "./Movers/KingMover";
import QueenMover from "./Movers/QueenMover";
import BishopMover from "./Movers/BishopMover";
import RookMover from "./Movers/RookMover";
import KnightMover from "./Movers/KnightMover";

/**
 * Uses the first letter of a move to determine which piece-mover to use.
 */
export default class MoveMaker {

  constructor(board) {
    this.board = board;

    this.movers = {};
    this.movers['R'] = new RookMover(this.board);
    this.movers['K'] = new KingMover(this.board);
    this.movers['O'] = new CastleMover(this.board);
    this.movers['B'] = new BishopMover(this.board);
    this.movers['Q'] = new QueenMover(this.board);
    this.movers['N'] = new KnightMover(this.board);

    // Fallback mover
    this.pawnMover = new PawnMover(this.board);
  }

  makeMove(move) {
    console.log(`${move.player} | ${move.strippedNotation}`);

    const player = move.player;
    const notation = move.strippedNotation;

    const firstLetter = notation[0];

    let mover = this.movers[firstLetter];
    if (!mover) {
      mover = this.pawnMover;
    }

    mover.move(this.board, player, notation);
  }
}
