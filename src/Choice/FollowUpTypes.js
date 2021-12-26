// noinspection JSUnusedGlobalSymbols

export default class FollowUpTypes {
  static NONE = 'None';
  static BRIEF_RESPONSE = 'Brief Response';
  static LONG_RESPONSE = 'Long Response';
  static UPLOAD_SPREADSHEET = 'Upload Spreadsheet';
  static UPLOAD_PDF = 'Upload PDF';
  static MULTIPLE_CHOICE = 'Multiple Choice';

  /**
   * Get the above variables as a list.
   */
  static getAllTypes() {
    const propertyNames = Object.getOwnPropertyNames(FollowUpTypes);
    const keys = [];
    for (const key of propertyNames) {
      if (key === 'length' || key === 'prototype' || key === 'name' || key === 'getAllTypes') {
        continue;
      }
      keys.push(FollowUpTypes[key]);
    }
    return keys;
  }
}