import {PAWN} from "../Constants/pieces";
import SquareState from "./SquareState";

/**
 * Manages the state of a game.
 */
export default class GameManager {
  /**
   *  2D Array of square states.
   */
  boardState = [];

  constructor() {
    for (let c = 0; c < 8; c++) {
      const columns = [];
      for (let r = 0; r < 8; r++) {
        columns.push(new SquareState());
      }
      this.boardState.push(columns);
    }

    // Testing code just to see a row of pawns.
    for (let i = 0; i < 8; i++) {
      this.boardState[i][1] = {
        piece: PAWN
      }
    }
  }

  getSquareState(col, row) {
    return this.boardState[col][row];
  }
}
