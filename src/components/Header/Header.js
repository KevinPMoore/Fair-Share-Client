import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
    state = {
        burger: 'show',
        buttons: 'hide'
    };

    updateBurger = () => {
        if(this.state.burger === 'hide' ) {
            this.setState({ burger: 'show' });
        } else {
            this.setState({ burger: 'hide' });
        }
    };

    updateButtons = () => {
        if(this.state.buttons === 'hide' ) {
            this.setState({ buttons: 'show' });
        } else {
            this.setState({ buttons: 'hide' });
        }
    };

    handleToggleClick = () => {
        this.updateButtons();
        this.updateBurger();
    };

    render() {
        return(
            <nav className='nav'>

            </nav>
        )
    };
};

export default Header;