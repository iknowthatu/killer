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

  /**
   *
   * @param {number} start
   * @param {number} end
   */
  static random(start, end) {
    if (end === undefined) {
      end = start;
      start = 0;
    }

    return Math.random() * (end - start) + start;
  }

  /**
   * returns pseudorandom integer number between start and end
   * @param {number} start
   * @param {number} end
   */
  static integerRandom(start, end) {
    return Math.round(CommonUtils.random(start, end));
  }

  /**
   * return object with global app vars, which are filled by xhr request/response hook
   * @returns {object}
   */
  static getGlobalVars() {
    const hiddenStore = document.querySelector('[data-globalvarsstore]');
    const globalVars = JSON.parse(hiddenStore.value);

    return globalVars;
  }

  /**
   * send request to league server with user token
   * @param {string} url
   * @param {object[]} params
   */
  static sendRequest(url, params = []) {
    const formData = new FormData();
    formData.append('t_key', CommonUtils.getGlobalVars().t_key);
    params.forEach(param => {
      formData.append(param.key, param.value);
    });

    const options = {
      method: 'POST',
      body: formData,
      credentials: 'include'
    };

    //'http://game.league17.ru/do/pokes/load/team'
    return fetch(url, options)
      .then(response => response.json());
  }
}