/**
 * Static helpers which make it easier to work with endpoints.
 */
export class CloudHelper {
  static async getIdToken(loginManager) {
    const user = await loginManager.awaitUser();
    if (user) {
      return await user.getIdToken(false);
    } else {
      return null;
    }
  }
}
