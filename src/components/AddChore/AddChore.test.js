import React from 'react';
import ShallowRender from 'react-test-renderer';
import AddChore from './AddChore';

it('renders without crashing', () => {
    const renderer = new ShallowRender();
    renderer.render(<AddChore/>)
});