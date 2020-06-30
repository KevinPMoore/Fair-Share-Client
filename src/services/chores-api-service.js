import config from '../config';
import TokenService from './token-service';

const FSChoreService = {
    getChores() {
       return fetch(`${config.API_ENDPOINT}/chores`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
       }) 
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            );
    },
    getChoreById(id) {
        return fetch(`${config.API_ENDPOINT}/chores/${id}`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => 
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            );
    },
    postChore(name, householdid) {
        return fetch(`${config.API_ENDPOINT}/chores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                chorename: name,
                chorehousehold: householdid
            })
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        );
    },
    patchChore(id, choreuser, chorehousehold, chorename) {
        return fetch(`/${config.API_ENDPOINT}/chores/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                chorename,
                choreuser,
                chorehousehold
            })
        });
    },
    deleteUser(id) {
        return fetch(`${config.API_ENDPOINT}/chores/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        });
    }
};

export default FSChoreService;