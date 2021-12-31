import AbstractPieceMover from "./AbstractPieceMover";

export default class KnightMover extends AbstractPieceMover {
  constructor() {
    super();
    this.setVerbose(true);
  }

  move(board, player, notation) {
    console.warn("Knight Mover not implemented.")
  }
}
