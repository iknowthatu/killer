export default class CommonUtils {
  /**
   * returns waiting promise
   * @param {number} seconds
   * @param {any} [paramToChain]
   */
  static wait(seconds, paramToChain) {
    return new Promise(resolve => {
      setTimeout(() => resolve(paramToChain), seconds * 1000);
    });
  }
}