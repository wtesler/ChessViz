import AbstractPieceMover from "./AbstractPieceMover";

export default class BishopMover extends AbstractPieceMover {
  constructor() {
    super();
    this.setVerbose(true);
  }

  move(board, player, notation) {
    console.warn("Bishop Mover not implemented.")
  }
}
