import {Requests} from "../Subscriptions/shared/Requests";

export default class Manager {

  obj = null;

  listeners = [];

  requests = new Requests();

  locked = false;

  destruct() {
    this.clear();
    this.requests.unmount();
  }

  clear() {
    this.obj = undefined;
  }

  getRequests() {
    return this.requests;
  }

  setReadFunc(readFunc) {
    this.readFunc = readFunc;
  }

  async read() {
    this.locked = true;
    try {
      this.obj = await this.readFunc();
      for (const listener of this.listeners) {
        listener(this.obj);
      }
    } finally {
      this.locked = false;
    }
  }

  addListener(listener) {
    this.listeners.push(listener);
    if (this.obj) {
      listener(this.obj);
    } else if (!this.locked) {
      this.read();
    }
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(x => x !== listener);
  }
}
