import {BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK} from "../Constants/pieces";
import SquareState from "./SquareState";
import {AbstractDataManager} from "abstract-data-manager";
import {BLACK, WHITE} from "../Constants/players";
import PieceInfo from "./PieceInfo";
import MoveMaker from "./MoveMaker";

/**
 * Manages the state of a game.
 */
export default class GameManager extends AbstractDataManager {
  /**
   *  2D Array of square states.
   */
  boardState = [];

  currentGame = null;
  currentMoveIndex = 0;

  constructor(playerGamesManager) {
    super();

    this.moveMaker = new MoveMaker(this.boardState);

    this.onPlayerGames = this.onPlayerGames.bind(this);

    for (let c = 0; c < 8; c++) {
      const columns = [];
      for (let r = 0; r < 8; r++) {
        columns.push(new SquareState());
      }
      this.boardState.push(columns);
    }

    this.resetPieces();

    this.playerGamesManager = playerGamesManager;

    this.playerGamesManager.addListener(this.onPlayerGames);
  }

  onPlayerGames(games) {
    this.currentGame = games[0];
    this.currentMoveIndex = 0;
  }

  step() {
    const moves = this.currentGame.parsedPgn.moves;
    const currentMove = moves[this.currentMoveIndex];
    // console.log(currentMove);
    this.moveMaker.makeMove(currentMove);
    this.update();
    this.currentMoveIndex++;
  }

  resetPieces() {
    this._initPawnRow(WHITE);
    this._initPawnRow(BLACK);

    this._initBackRow(WHITE);
    this._initBackRow(BLACK);

    this.update();
  }

  async getData() {
    return this.boardState;
  }

  cancel() {
    // Don't need to do any cleanup.
  }

  destruct() {
    this.playerGamesManager.removeListener(this.onPlayerGames);
  }

  getSquareState(col, row) {
    return this.boardState[col][row];
  }

  _initPawnRow(player) {
    const row = player === WHITE ? 1 : 6;
    for (let i = 0; i < 8; i++) {
      this.boardState[i][row].setPiece(new PieceInfo(PAWN, player));
    }
  }

  _initBackRow(player) {
    const row = player === WHITE ? 0 : 7;
    this.boardState[0][row].setPiece(new PieceInfo(ROOK, player));
    this.boardState[1][row].setPiece(new PieceInfo(KNIGHT, player));
    this.boardState[2][row].setPiece(new PieceInfo(BISHOP, player));
    this.boardState[3][row].setPiece(new PieceInfo(QUEEN, player));
    this.boardState[4][row].setPiece(new PieceInfo(KING, player));
    this.boardState[5][row].setPiece(new PieceInfo(BISHOP, player));
    this.boardState[6][row].setPiece(new PieceInfo(KNIGHT, player));
    this.boardState[7][row].setPiece(new PieceInfo(ROOK, player));
  }
}
