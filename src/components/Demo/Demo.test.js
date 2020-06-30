import React from 'react';
import ShallowRender from 'react-test-renderer';
import Demo from './Demo';

it('renders without crashing', () => {
    const renderer = new ShallowRender();
    renderer.render(<Demo/>)
});