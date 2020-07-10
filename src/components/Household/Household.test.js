import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import Household from './Household';

it('renders without crashing', () => {
    const user = {userid: 1, username: 'A user'};
    const household = {householdid: 1, householdname: 'A household'};
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Household user={user} household={household} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});