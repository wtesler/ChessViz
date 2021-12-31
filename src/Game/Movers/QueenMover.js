import AbstractPieceMover from "./AbstractPieceMover";

export default class QueenMover extends AbstractPieceMover {
  constructor() {
    super();
    this.setVerbose(true);
  }

  move(board, player, notation) {
    console.warn("Queen Mover not implemented.")
  }
}
