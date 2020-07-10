import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import Demo from './Demo';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Demo /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});