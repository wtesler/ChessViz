import Manager from "../Manager/Manager";

export default class ProfileManager extends Manager {
  constructor(loginManager, serverClient) {
    super();

    this.onUser = this.onUser.bind(this);

    this.loginManager = loginManager;
    this.serverClient = serverClient;

    this.uidOverride = null;

    loginManager.addListener(this.onUser);

    this.setReadFunc(() => this.serverClient.readProfile(this.uidOverride, this.getRequests()));
  }

  destruct() {
    super.destruct();
    this.loginManager.removeListener(this.onUser);
  }

  setUidOverride(uid) {
    this.uidOverride = uid;
  }

  onUser(user) {
    if (!user) {
      this.clear();
    }
  }
}
