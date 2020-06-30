import config from '../config';
import TokenService from './token-service';

const FSHouseholdService = {
    getHouseholds() {
        return fetch(`${config.API_ENDPOINT}/households`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => 
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            );
    },
    getHouseholdById(id) {
        return fetch(`${config.API_ENDPOINT}/households/${id}`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            );
    },
    patchHousehold(id, householdname) {
        return fetch(`${config.API_ENDPOINT}/households/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                householdname
            })
        })
    },
    deleteHousehold(id) {
        return fetch(`${config.API_ENDPOINT}/households/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        });
    },
    getHouseholdUsers(id) {
        return fetch(`${config.API_ENDPOINT}/households/${id}/users`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        );
    },
    getHouseholdChores(id) {
        return fetch(`${config.API_ENDPOINT}/households/${id}/chores`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        );
    }
};

export default FSHouseholdService;