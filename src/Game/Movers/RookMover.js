import AbstractPieceMover from "./AbstractPieceMover";

export default class RookMover extends AbstractPieceMover {
  constructor() {
    super();
    this.setVerbose(true);
  }

  move(board, player, notation) {
    console.warn("Rook Mover not implemented.")
  }
}
