import React from 'react';
import { Link } from 'react-router-dom';
import './AddChore.css';

export default class AddChore extends React.Component {

    //use props passed by app

    render() {
        return(
            <form
                className='addchoreform'
            >
                <label
                    htmlFor='chorename'
                >
                    Chore name
                </label>
                <input
                   type='text'
                   placeholder='swab the deck'
                   required
                >
                </input>
            </form>
        )
    };
};