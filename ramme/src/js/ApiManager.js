/**
 * @author: Fabian Büdding
 * @this {ApiManager}
 * @class
 *
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
   *
   * @typedef {Object} response
   * @property {string} status - The statusCode
   * @property {string} statusText - The statusText
   * @property {Object} body - The body with sendet object
   */
  /**
   * makes an API GET request
   *
   * @async
   * @returns {Promise<response>} - response as promise, status, statusText and body
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
      return {
        status: resp.status,
        statusText: resp.statusText,
        body: await resp.json()
      };
    } catch (error) {
      throw error;
    }
  }
  /**
   * makes an API POST request
   *
   * @async
   * @returns {Promise<response>} - response as promise, status, statusText and body
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

    try {
      const resp = await fetch(this.url + endpoint, params);
      return {
        status: resp.status,
        statusText: resp.statusText,
        body: await resp.json()
      };
    } catch (error) {
      throw error;
    }
  }
  // TODO: implement put and remove
  async put(endpoint) {}

  async remove(endpoint) {}
}

export default ApiManager;
