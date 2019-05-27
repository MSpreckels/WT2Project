/**
 * @author: Fabian Büdding
 * @this {ApiManager}
 */

class ApiManager {
  url = "";
  /**
   * Creates an instance of ApiManager
   *
   * @constructor
   * @param {string} url url der Api
   */
  constructor(url) {
    if (!url.endsWith("/")) url += "/";
    this.url = url;
  }

  /**
   * makes an API GET request
   *
   * @async
   * @returns {promise} response as promise
   * @throws {error}
   * @param {string} endpoint string with full endpoint
   */
  async get(endpoint) {
    if (endpoint.startsWith("/")) endpoint = endpoint.substring(1);
    var params = {
      method: "GET",
      credentials: "include"
    };
    try {
      const resp = await fetch(this.url + endpoint, params);
      const json = await resp.json();
      return json;
    } catch (error) {
      throw error;
    }
  }
  /**
   * makes an API POST request
   *
   * @async
   * @returns {promise} response as promise
   * @throws {error}
   * @param {string} endpoint string with full endpoint
   */
  async post(endpoint, message) {
    if (endpoint.startsWith("/")) endpoint = endpoint.substring(1);
    var params = {
      method: "POST",
      credentials: "include"
    };
    params.headers = { "Content-Type": "application/json" };
    params.body = JSON.stringify({ message: message });
    console.log(params);

    try {
      const resp = await fetch(this.url + endpoint, params);
      const json = await resp.json();
      return json;
    } catch (error) {
      throw error;
    }
  }
  // TODO: implement put and remove
  async put(endpoint) {}

  async remove(endpoint) {}
}

export default ApiManager;
