export default class StoreKeys {

  static getAllKeys() {
    const propertyNames = Object.getOwnPropertyNames(StoreKeys);
    const keys = [];
    for (const key of propertyNames) {
      if (key === 'length' || key === 'prototype' || key === 'name' || key === 'getAllKeys') {
        continue;
      }
      keys.push(StoreKeys[key]);
    }
    return keys;
  }
}
