import Manager from "../Manager/Manager";

export default class PlanManager extends Manager {
  PLANS = ['NONE', 'PAID'];
  AWARDS = ['NONE', 'BRONZE', 'SILVER', 'GOLD'];

  constructor(loginManager, serverClient, toastRelay) {
    super();

    this._onUser = this._onUser.bind(this);

    this.loginManager = loginManager;
    this.serverClient = serverClient;
    this.toastRelay = toastRelay;

    loginManager.addListener(this._onUser);

    this.uidOverride = null;

    this.setReadFunc(() => this.serverClient.readPlan(this.uidOverride, super.getRequests()));
  }

  destruct() {
    super.destruct();
    this.loginManager.removeListener(this._onUser);
  }

  setUidOverride(uid) {
    this.uidOverride = uid;
  }

  getPlans() {
    return this.PLANS;
  }

  getAwards() {
    return this.AWARDS;
  }

  async updatePlan(uid, plan) {
    try {
      this.toastRelay.show('Updating Plan...', true);
      await this.serverClient.updatePlan(uid, plan, super.getRequests());
      super.read();
      this.toastRelay.show(null);
    } catch (e) {
      console.error(e);
      this.toastRelay.show(null);
      this.toastRelay.show('Failed to update plan. Try again.', false, 5000);
    }
  }

  async assignLiason(uid, liasonId) {
    try {
      this.toastRelay.show('Assigning New Liaison...', true);
      await this.serverClient.assignLiason(uid, liasonId, super.getRequests());
      super.read();
      this.toastRelay.show(null);
    } catch (e) {
      console.error(e);
      this.toastRelay.show(null);
      let msg = 'Failed to assign liaison. Try again.';
      if (e.code === 404) {
        msg = e.message;
      }
      this.toastRelay.show(msg, false, 5000);
    }
  }

  async removeLiason(uid) {
    try {
      this.toastRelay.show('Removing Liaison...', true);
      await this.serverClient.removeLiason(uid, super.getRequests());
      super.read();
      this.toastRelay.show(null);
    } catch (e) {
      console.error(e);
      this.toastRelay.show(null);
      this.toastRelay.show('Failed to remove liaison. Try again.', false, 5000);
    }
  }

  _onUser(user) {
    if (!user) {
      super.clear();
    }
  }
}
