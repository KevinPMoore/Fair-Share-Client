import React from 'react';
import TestRenderer from 'react-test-renderer';
import AddChore from './AddChore';

it('renders without crashing', () => {
    let household = {householdid: 1, householdname: 'A name'};
    TestRenderer.create(<AddChore household={household} />);
});