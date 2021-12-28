/**
 * Manages the state of a game.
 */
export default class GameManager {
  boardState = [];

  constructor() {
    for (let c = 0; c < 8; c++) {
      const columns = [];
      for (let r = 0; r < 8; r++) {
        const squareData = {}
        columns.push(squareData);
      }
      this.boardState.push(columns);
    }

    for (let i = 0; i < 8; i++) {
      this.boardState[i][1] = {
        piece: 'pawn'
      }
    }
  }

  getSquareState(col, row) {
    return this.boardState[col][row];
  }
}

// {
//   piece: 'N1',
//     whiteInfluence: 2,
//   blackInfluence: 1,
// }