import React from 'react';
import Store from '../../store';
import './Demo.css';

export default class Demo extends React.Component {
    state = {
        chores: [],
    };

    renderChoreList = () => {
        console.log('renderChoreList ran')
        const chores = this.state.chores;
        console.log('chores are ', chores)
        const listItems = chores.map((chore) =>
            <li key={chores.indexOf(chore)}>
                {chore}
            </li>
        );
        return(
            <ul className='chorelist'>
                {listItems}
            </ul>
        );
    };

    componentDidMount() {
        this.setState({
            chores: Store
        });
    };

    render() {
        return(
            <div className='demo'>
                <h2>
                    Demo House
                </h2>
                <section className='demousers'>
                    <div className='demouser'>
                        <span className='demousername'>User1</span>
                    </div>
                    <div className='demouser'>
                        <span className='demousername'>User2</span>
                    </div>
                </section>
                <section className='demochores'>
                    <span className='demovertical'>Chores</span>
                    {this.renderChoreList()}
                    <div className='demochorebuttons'>
                        <button>
                            Unassign All
                        </button>
                        <button>
                            Randomize
                        </button>
                    </div>
                </section>
            </div>
        );
    };
};