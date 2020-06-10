import React from 'react';
import Store from '../../store';
import './Demo.css';

export default class Demo extends React.Component {
    state = {
        assignedChores: [],
        unassignedChores: []
    };

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    handleDrag = (ev) => {
        ev.dataTransfer.setData('text', ev.target.id);
    }

    //It is correctly tracking new values and updating state
    //When an element is dragged and dropped, it is also no longer rendering the element that came after it
    //However, it is removing additional elements
    //I suspect the splice method on 32 is the issue
    handleDrop = (ev) => {
        let newAssignedChores = this.state.assignedChores;
        let newUnassignedChores = this.state.unassignedChores;
        ev.preventDefault();
        let data = ev.dataTransfer.getData('text');
        console.log('data is ', data)
        ev.target.appendChild(document.getElementById(data));
        newAssignedChores.push(newUnassignedChores[data]);
        console.log('assigned chores are ', newAssignedChores);
        newUnassignedChores.splice(data, 1);
        console.log('unassigned chores are ', newUnassignedChores);
        this.setState({
            assignedChores: newAssignedChores,
            unassignedChores: newUnassignedChores
        })
    }

    renderChoreList = () => {
        console.log('renderChoreList ran')
        let chores = this.state.unassignedChores;

        let listItems = chores.map((chore) =>
            <li 
                id={chores.indexOf(chore)}
                className='demochore'
                draggable='true'
                onDragStart={this.handleDrag}
                key={chores.indexOf(chore)}>
                {chore}
            </li>
        );
        return(
            <ul className='demochorelist'>
                {listItems}
            </ul>
        );
    };

    componentDidMount() {
        this.setState({
            unassignedChores: Store
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
                <section className='demousers'>
                    <div 
                        id='demouser1'
                        className='demouser'
                    >
                        <p className='demousername'>User1</p>
                        <ul 
                            className='demouserchores'
                            draggable='true'
                            onDrop={this.handleDrop}
                            onDragOver={this.allowDrop}
                        >

                        </ul>
                    </div>
                    <div 
                        id='demouser2'
                        className='demouser'
                    >
                        <p className='demousername'>User2</p>
                        <ul className='demouserchores'>

                        </ul>
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