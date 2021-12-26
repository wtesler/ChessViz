export class DirtyManager {
  constructor() {
    this._dirty = false;
  }

  destruct() {
    this._dirty = false;
  }

  isDirty() {
    return this._dirty;
  }

  setDirty(isDirty) {
    this._dirty = isDirty;
  }
}