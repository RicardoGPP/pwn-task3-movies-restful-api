//Imports necessary dependencies.
import axios from 'axios';

//Defines base URL.
const baseUrl = `${import.meta.env.VITE_BASE_URL}/movies`;

/**
 * Provides methods for interacting with movies API. 
 */
export default class {

    /**
     * Gets all movies.
     * 
     * @returns A promise that resolves to an array of movies.
     */
    static getAll() {
        return axios.get(baseUrl, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data);
    }

    /**
     * Gets a movie by its ID.
     * 
     * @param {Number} id The ID of the movie.
     * @returns A promise that resolves to a movie.
     */
    static getById(id) {
        return axios.get(`${baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data);
    }

    /**
     * Creates a movie.
     * 
     * @param {Object} movie The movie to be created.
     * @returns A promise that resolves to the created movie.
     */
    static create(movie) {
        return axios.post(baseUrl, movie, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data);
    }

    /**
     * Updates a movie.
     * 
     * @param {Number} id The ID of the movie.
     * @param {Object} The movie to be updated.
     * @returns A promise that resolves to the updated movie.
     */
    static update(id, movie) {
        return axios.put(`${baseUrl}/${id}`, movie, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data);
    }

    /**
     * Deletes a movie.
     * 
     * @param {Number} id The ID of the movie.
     * @returns A promise that resolves to the deleted movie.
     */
    static delete(id) {
        return axios.delete(`${baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data);
    }
}