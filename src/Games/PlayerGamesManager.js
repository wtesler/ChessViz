import {AbstractDataManager} from "abstract-data-manager";
import {Requests} from "../Lifecycles/shared/Requests";

/**
 * Provides an interface for getting player games data.
 */
export default class PlayerGamesManager extends AbstractDataManager {

  constructor(chessDotComClient) {
    super();
    this.chessDotComClient = chessDotComClient;
    this.requests = new Requests();

    this.username = '';
    this.month = 0;
    this.year = 0;
  }

  // Overriden from super
  async getData() {
    if (!this.username) {
      throw new Error("You must call `setParams` before trying to get data");
    }
    return this.chessDotComClient.readPlayerPgns(this.username, this.month, this.year, this.requests);
  }

  // Overriden from super
  cancel() {
    this.requests.abort();
  }

  // Overriden from super
  destruct() {
    super.destruct();
    this.username = "";
    this.month = 0;
    this.year = 0;
  }

  /**
   * Set the params of a request which will fetch player pgns for the given parameters.
   *
   * This call sets the params and then issues an update for fresh data.
   *
   * @param username string like 'hellowill89'
   * @param month int like 12
   * @param year int like 2021
   * @return promise of an update.
   */
  async setParams(username, month, year) {
    this.username = username;
    this.month = month;
    this.year = year;
    return super.update(null, true);
  }
}
