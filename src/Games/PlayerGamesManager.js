import {AbstractDataManager} from "abstract-data-manager";
import {Requests} from "../Lifecycles/shared/Requests";
import {BLACK, WHITE} from "../Constants/players";

/**
 * Provides an interface for getting player games data.
 *
 * Call `fetch(username, month, year)` to fetch.
 * It triggers a network request to fetch the data.
 *
 * Currently only works with chess.com.
 */
export default class PlayerGamesManager extends AbstractDataManager {
  constructor(chessDotComClient) {
    super();
    this.chessDotComClient = chessDotComClient;
    this.requests = new Requests();

    this._resetParams();

    this.fetch('hellowill89', '12', '2021');
  }

  /**
   * Trigger an update with the given parameters.
   *
   * @param username string like 'hellowill89'
   * @param month int like 12
   * @param year int like 2021
   * @return promise of an update.
   */
  async fetch(username, month, year) {
    this.username = username;
    this.month = month;
    this.year = year;
    return super.update(null, true);
  }

  // Overriden from super
  async getData() {
    if (!this.username || this.month < 0 || this.year < 0) {
      throw new Error("Don't call update directly. Call `fetch` instead.");
    }
    const playerGames = await this.chessDotComClient.readPlayerPgns(this.username, this.month, this.year, this.requests);
    this.parsePgns(playerGames);
    return playerGames;
  }

  parsePgns(playerGames) {
    for (const game of playerGames) {
      const pgn = game.pgn;
      const splitPgn = pgn.split('\n');

      const parsedPgn = {
        meta: {},
        moves: []
      };

      // Metadata loop
      for (let line of splitPgn) {
        if (!line || line.length === 0 || line[0] !== '[') {
          break;
        }
        line = line.replace('[', '').replace(']', '');
        const splitLine = line.split(' ');
        const key = splitLine[0];
        const value = splitLine.slice(1, splitLine.length).join(' ').replaceAll('"', '');
        parsedPgn.meta[key] = value;
      }

      let movesLine = splitPgn[splitPgn.length - 2];
      let timeStamps = movesLine.match(/{(.*?)}/g);
      timeStamps = timeStamps.map(s => s.replaceAll('{[%clk ', ''));
      timeStamps = timeStamps.map(s => s.replaceAll(']}', ''));

      movesLine = movesLine.replaceAll(/{(.*?)}/g, '');
      movesLine = movesLine.replaceAll('.', '');
      let movesList = movesLine.split(' ');
      movesList.pop(); //the last value is result not a move.
      movesList = movesList.filter(m => m); //removes empty strings right side of arrow is bool check. removes all false on list.
      for (let i = 0; i < movesList.length; i+=2) {
        const number = Number(movesList[i]);
        const notation = movesList[i+1];
        const move = {
          number: number,
          notation: notation,
          player: parsedPgn.moves.length % 2 === 0 ? WHITE : BLACK,
          timeStamp: timeStamps[i / 2]
        };
        parsedPgn.moves.push(move);
      }
      game.parsedPgn = parsedPgn;
    }
  }

  // Overriden from super
  cancel() {
    this.requests.abort();
  }

  // Overriden from super
  destruct() {
    super.destruct();
    this._resetParams();
  }

  _resetParams() {
    this.username = '';
    this.month = -1;
    this.year = -1;
  }
}
