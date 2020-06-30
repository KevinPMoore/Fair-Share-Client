import config from '../config';
import TokenService from './token-service';

//CRUD operations for the users API endpoint
const FSUserService = {
    getUsers() {
        return fetch(`${config.API_ENDPOINT}/users`, {
            headers: {},
        })
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            );
    },
    getUserById(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            );
    },
    patchUser(id, username, userhousehold, userchores) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                username,
                userhousehold,
                userchores
            })
        });
    },
    deleteUser(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        });
    },
    getUserChores(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}/chores`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        );
    }
};

export default FSUserService;