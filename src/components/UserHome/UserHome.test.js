import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import UserHome from './UserHome';

it('renders without crashing', () => {
    const user = {userid: 1, username: 'A user'};
    const household = {householdid: 1, householdname: 'A household'};
    
    function setUser(user) {
        return(user)
    };

    function setHousehold(household) {
        return(household)
    };

    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><UserHome user={user} setUser={setUser} household={household} setHousehold={setHousehold}/></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});