//Imports necessary dependencies.
import axios from 'axios';

//Defines base URL.
const baseUrl = `${import.meta.env.VITE_BASE_URL}/auth`;

/**
 * Provides methods for interacting with auth API. 
 */
export default class {

    /**
     * Registers a new user.
     * 
     * @param {String} login The login of the user.
     * @param {String} password The password of the user.
     * @returns A promise that resolves to nothing.
     */
    static register(login, password) {
        return axios.post(`${baseUrl}/register`, {
            login,
            password
        });
    }

    /**
     * Performs a user login and gets a JWT token.
     * 
     * @param {String} login The login of the user.
     * @param {String} password The password of the user.
     * @returns A promise that resolves to a JWT token.
     */
    static login(login, password) {
        return axios.post(`${baseUrl}/login`, {
            login,
            password
        }).then(response => response.data.token);
    }
}