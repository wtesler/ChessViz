/**
 * A persistence store which can hold values per-session or permanently.
 */
import {BehaviorSubject} from "rxjs";
import {distinctUntilChanged, filter} from "rxjs/operators";
import StoreKeys from "./StoreKeys";

export default class Store {
  constructor() {
    this.session = new Map();
    this.subjects = {};

    for (const key of StoreKeys.getAllKeys()) {
      this._push(key, this.getPermanent(key));
    }
  }

  destruct() {
    for (const subject of Object.values(this.subjects)) {
      subject.complete();
    }
    this.subjects = {};
  }

  setForSession(key, value) {
    this.session.set(key, value);
  }

  getForSession(key) {
    return this.session.get(key);
  }

  removeForSession(key) {
    this.session.delete(key);
  }

  setPermanent(key, value) {
    this._push(key, value);
    if (typeof (value) === "object") {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
  }

  getPermanent(key) {
    let value = window.localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      if (value === 'undefined') {
        return undefined
      } else if (value === 'null') {
        return null;
      } else if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else if (value === 'no') {
        return false;
      } else if (value === 'yes') {
        return true;
      } else {
        return value;
      }
    }
  }

  removePermanent(key) {
    window.localStorage.removeItem(key);
  }

  setAll(key, value) {
    this.setForSession(key, value);
    this.setPermanent(key, value);
  }

  observePermanentChange(key) {
    this._ensureExists(key);
    return this.subjects[key].asObservable()
      .pipe(
        filter(x => x !== undefined),
        distinctUntilChanged()
      );
  }

  _push(key, value) {
    this._ensureExists(key);
    this.subjects[key].next(value);
  }

  _ensureExists(key) {
    if (!(key in this.subjects)) {
      this.subjects[key] = new BehaviorSubject(undefined);
    }
  }
}
