import React from 'react';
import Store from '../../store';
import { Link } from 'react-router-dom';
import './AddChore.css';

export default class AddChore extends React.Component {
    state = {
        baseChores: [],
        baseUsers: []
    };

    renderAllChores = (chores) => {
        let choresList = chores.map(chore =>
            <li
                className='choreitem'
                key={chores.indexOf(chore)}
                id={chores.indexOf(chore)}
            >
                {chore}
                <button
                    className='addchorebutton'
                >
                    Add
                </button>
            </li>    
        );
        return(
            <ul
                className='choreslist'
            >
                {choresList}
            </ul>
        )
    };

    //use props passed by app

    componentDidMount() {
        this.setState({
            baseChores: Store.storedChores,
            baseUsers: Store.storedUsers
        });
    };

    render() {
        return(
            <div
                className='addchore'
            >
                <div
                    className='basechorelist'
                >
                    {this.renderAllChores(this.state.baseChores)}
                </div>
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
                    <button
                        className='newchorebutton'
                        type='submit'
                    >
                        Add new chore
                    </button>
            </form>
            </div>
        )
    };
};