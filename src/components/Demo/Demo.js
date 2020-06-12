import React from 'react';
import Store from '../../store';
import './Demo.css';

export default class Demo extends React.Component {
    state = {
        assignedChores: [],
        unassignedChores: [],
    };

    renderUsers = () => {
        let users = Store.storedUsers.map(user => 
                <div 
                    key={user.id}
                    id={user.id}
                    className='demouser'
                >
                    <p className='demousername'>{user.username}</p>
                    <ul 
                        className='demouserchores'
                    >

                    </ul>
                </div>
        );
        return(
            <section className='demousers'>
               {users} 
            </section>
        )
    };

    //add buttons to being rendered
    renderChoreList = () => {
        let chores = this.state.unassignedChores;
        console.log(chores)

    };

    componentDidMount() {
        this.setState({
            unassignedChores: Store.storedChores
        });
    };

    //TODOs:
    //chores can be dragged/dropped
    //unassign resets chore list
    //randomize assigns chores
    render() {
        return(
            <div className='demo'>
                <h2>
                    Demo House
                </h2>
                <button
                    //onClick={this.renderChoreList}
                >
                    Stupid button
                </button>
                {this.renderUsers()}
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