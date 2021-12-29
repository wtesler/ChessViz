import {AbstractDataManager} from "abstract-data-manager";
import {Requests} from "../Lifecycles/shared/Requests";

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
      throw new Error("You must call `setParams` with valid values before trying to get data");
    }
    const playerGames = await this.chessDotComClient.readPlayerPgns(this.username, this.month, this.year, this.requests);
    this.parsePgns(playerGames);
    return playerGames;
  }

  parsePgns(playerGames) {
    for (const game of playerGames) {
      const pgn = game.pgn;
      const splitPgn = pgn.split('\n');
      let movesList = [];
      const parsedPgn = {
        meta: {event:"", site:"", date:"", round:"",
               WUser:"", BUser:"", result:"", curr_pos:"", timeZone:"",
               eco:"", ecoUrl:"", UTCDate:"", UTCTime:"", whiteElo:"",
               blackElo:"", timeControl:"", termination:"", startTime:"",
               endDate:"", endTime:"", link:""},
        moves: []
      };
      for (const line of splitPgn){
        if (line[0] === '[')
          parsedPgn.meta[0] = line.substring(
          line.indexOf('"') + 1,
          line.lastIndexOf('"')
        );
        if (line[0] === '1')
          movesList = line.split('}');
      }
      for (const move in movesList) {
        const cleanMove = movesList[move].replace(/{(.*?)]/,'');
        parsedPgn.moves.push(cleanMove);
      }
      console.log(parsedPgn.meta)
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
