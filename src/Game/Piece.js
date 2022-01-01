/**
 * Information about a piece including it's type and which player it belongs to.
 */
export default class Piece {
  constructor(type, player) {
    this.type = type;
    this.player = player;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  getPlayer() {
    return this.player;
  }
}
