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
    const playerPgns = this.chessDotComClient.readPlayerPgns(this.username, this.month, this.year, this.requests);

    return playerPgns;
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
