import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import NotFound from './NotFound';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><NotFound /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});