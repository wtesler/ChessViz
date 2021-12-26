import toResilient from './Helpers/toResilient';
import {CloudHelper} from './Helpers/CloudHelper';
import toAuthorized from './Helpers/toAuthorized';
import {LoginManager} from 'firebase-login-manager';

const request = require('superagent');

export default class FileClient {
  constructor() {
    this.loginManager = new LoginManager(false, null);
  }

  destruct() {
    this.loginManager.destruct();
  }

  async downloadSignedUrl(signedUrl, contentType, requests) {
    const serverResponse = await this._hitEndpoint(signedUrl, 'get', {}, false, contentType, requests);
    return serverResponse;
  }

  async _hitEndpoint(endpoint, type='get', data={}, isAuthorized=false, contentType=null, requests=null) {
    const dataAction = type === 'get' ? 'query' : 'send';

    let req = request
      [type](endpoint)
      [dataAction](data);

    if (contentType) {
      req = req.set('Content-Type', contentType);
    }

    return await this._finalizeRequest(req, endpoint, isAuthorized, requests);
  }

  async _finalizeRequest(req, endpoint, isAuthorized, requests) {
    req = req.use(toResilient());

    if (isAuthorized) {
      const idToken = await CloudHelper.getIdToken(this.loginManager);
      req = req.use(toAuthorized(idToken));
    }

    if (requests) {
      requests.add(req);
    }

    return await req;
  }
}
