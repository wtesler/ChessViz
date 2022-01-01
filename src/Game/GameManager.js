import {BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK} from "../Constants/pieces";
import Square from "./Square";
import {AbstractDataManager} from "abstract-data-manager";
import {BLACK, WHITE} from "../Constants/players";
import Piece from "./Piece";
import MoveMaker from "./MoveMaker";
import AttentionUpdater from "./AttentionUpdater";

/**
 * Manages the state of a game.
 */
export default class GameManager extends AbstractDataManager {

  /**
   *  2D Array of squares.
   */
  board = [];

  games = [];
  currentGame = null;
  currentGameIndex = 0;
  currentMoveIndex = 0;

  constructor(playerGamesManager) {
    super();

    this.moveMaker = new MoveMaker(this.board);
    this.attentionUpdater = new AttentionUpdater();

    this.onPlayerGames = this.onPlayerGames.bind(this);

    for (let c = 0; c < 8; c++) {
      const columns = [];
      for (let r = 0; r < 8; r++) {
        columns.push(new Square());
      }
      this.board.push(columns);
    }

    this.resetPieces();

    this.playerGamesManager = playerGamesManager;

    this.playerGamesManager.addListener(this.onPlayerGames);
  }

  onPlayerGames(games) {
    this.games = games;
    this.setGameIndex(0);
  }

  setGameIndex(gameIndex) {
    this.resetPieces();
    this.currentGame = this.games[gameIndex];
    this.currentMoveIndex = 0;
  }

  step() {
    const moves = this.currentGame.parsedPgn.moves;

    if (this.currentMoveIndex >= moves.length) {
      console.log("Game ended.");
      return;
    }

    const currentMove = moves[this.currentMoveIndex];
    // console.log(currentMove);
    this.moveMaker.makeMove(currentMove);
    this.attentionUpdater.update(this.board);
    this.update();
    this.currentMoveIndex++;
  }

  resetPieces() {
    this._resetPawnRow(WHITE);
    this._resetPawnRow(BLACK);

    this._resetBackRow(WHITE);
    this._resetBackRow(BLACK);

    this.attentionUpdater.update(this.board);

    this.update();
  }

  async getData() {
    return this.board;
  }

  cancel() {
    // Don't need to do any cleanup because no remote tasks.
  }

  destruct() {
    this.playerGamesManager.removeListener(this.onPlayerGames);
  }

  getSquare(col, row) {
    return this.board[col][row];
  }

  _resetPawnRow(player) {
    const row = player === WHITE ? 1 : 6;
    for (let i = 0; i < 8; i++) {
      this.board[i][row].setPiece(new Piece(PAWN, player));
    }
  }

  _resetBackRow(player) {
    const row = player === WHITE ? 0 : 7;
    this.board[0][row].setPiece(new Piece(ROOK, player));
    this.board[1][row].setPiece(new Piece(KNIGHT, player));
    this.board[2][row].setPiece(new Piece(BISHOP, player));
    this.board[3][row].setPiece(new Piece(QUEEN, player));
    this.board[4][row].setPiece(new Piece(KING, player));
    this.board[5][row].setPiece(new Piece(BISHOP, player));
    this.board[6][row].setPiece(new Piece(KNIGHT, player));
    this.board[7][row].setPiece(new Piece(ROOK, player));
  }
}
