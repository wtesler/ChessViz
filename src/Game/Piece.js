/**
 * Information about a piece including it's type and which player it belongs to.
 */
export default class Piece {
  constructor(type, player) {
    this.type = type;
    this.player = player;
  }
}