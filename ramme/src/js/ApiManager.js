import { promises } from "fs";

/**
 * @author: Fabian Büdding
 * @this {ApiManager}
 */

class ApiManager {
    params = {
        method: "GET",
        credentials: "include"
    };
    initialized = false;
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
    isInitialized() {
        return this.initialized;
    }
    /**
     * Initializes an ApiManager object
     *
     * @async
     * @returns {promise} session as promise
     * @throws {error}
     */
    async initialize(callback) {
        try {
            const resp = await fetch(this.url + "session", this.params);
            const json = await resp.json();
            this.initialized = true;
            callback();
            return json;
        } catch (error) {
            throw error;
        }
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
        this.params.method = "GET";
        if (!this.initialized) throw new Error("ApiManager not initialized");
        try {
            const resp = await fetch(this.url + endpoint, this.params);
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
        this.params.method = "POST";
        this.params.headers = { "Content-Type": "application/json" };
        this.params.body = JSON.stringify({ message: message });
        if (!this.initialized) throw new Error("ApiManager not initialized");
        try {
            const resp = await fetch(this.url + endpoint, this.params);
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
