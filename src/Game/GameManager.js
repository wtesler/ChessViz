import {PAWN} from "../Constants/pieces";
import SquareState from "./SquareState";
import {AbstractDataManager} from "abstract-data-manager";

/**
 * Manages the state of a game.
 */
export default class GameManager extends AbstractDataManager {
  /**
   *  2D Array of square states.
   */
  boardState = [];

  constructor() {
    super();

    for (let c = 0; c < 8; c++) {
      const columns = [];
      for (let r = 0; r < 8; r++) {
        columns.push(new SquareState());
      }
      this.boardState.push(columns);
    }

    this.TEST_ROW_OF_PAWNS_REMOVE_THIS();
  }

  TEST_ROW_OF_PAWNS_REMOVE_THIS() {
    for (let i = 0; i < 8; i++) {
      this.boardState[i][1] = {
        piece: PAWN
      }
    }
    this.update()
  }

  async getData() {
    return this.boardState;
  }

  cancel() {
    // Don't need to do any cleanup.
  }

  getSquareState(col, row) {
    return this.boardState[col][row];
  }
}
