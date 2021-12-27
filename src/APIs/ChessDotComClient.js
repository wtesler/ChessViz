import toResilient from './Helpers/toResilient';
import errorThrowsBody from './Helpers/errorThrowsBody';

const request = require('superagent');
const jsonp = require('superagent-jsonp');

export default class ChessDotComClient {
  HOST = "https://api.chess.com/";
  PUB = 'pub';
  PLAYER = 'player';
  GAMES = 'games';

  destruct() {
  }

  async readPlayerPgns(username, month, year, requests) {
    const data = {};
    const endpoint = `${this.PUB}/${this.PLAYER}/${username}/${this.GAMES}/${year}/${month}`
    const serverResponse = await this._hitEndpoint(endpoint, 'get', data, false, null, requests);
    return serverResponse.games;
  }

  async _hitEndpoint(endpoint, type = 'get', data = {}, isAuthorized = false, contentType = null, requests = null) {
    const dataAction = type === 'get' ? 'query' : 'send';

    let req = request
      [type](this.HOST + endpoint)
      [dataAction](data);

    if (contentType) {
      req = req.set('Content-Type', contentType);
    } else {
      req = req.set('Content-Type', 'application/json');
    }

    return await this._finalizeRequest(req, endpoint, isAuthorized, requests);
  }

  async _finalizeRequest(req, endpoint, isAuthorized, requests) {
    req = req.use(toResilient());
    req = req.use(jsonp({
      timeout: 30000
    }));

    if (isAuthorized) {
      throw new Error("Authorization Not Supported");
    }

    if (requests) {
      requests.add(req);
    }

    try {
      const networkResponse = await req;
      return networkResponse.body;
    } catch (e) {
      errorThrowsBody(endpoint, e);
    }
  }
}
