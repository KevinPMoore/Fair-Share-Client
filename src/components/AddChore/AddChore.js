import React from 'react';
import Store from '../../store';
import './AddChore.css';

export default class AddChore extends React.Component {
    state = {
        baseChores: [],
        baseUsers: [],
        confirmationModal: 'hide',
        duplicateModal: 'hide'
    };

    updateConfirmationModal = () => {
        if(this.state.confirmationModal === 'hide') {
            this.setState({
                confirmationModal: 'modal'
            })
        } else {
            this.setState({
                confirmationModal: 'hide'
            })
        };
    };

    updateDuplicateModal = () => {
        if(this.state.duplicateModal === 'hide') {
            this.setState({
                duplicateModal: 'modal'
            })
        } else {
            this.setState({
                duplicateModal: 'hide'
            })
        };
    };

    renderAllChores = (chores) => {
        let choresList = chores.map(chore =>
            <li
                className='choreitem'
                key={chores.indexOf(chore)}
                id={chores.indexOf(chore)}
            >
                <p
                    className='addchorename'
                >
                    {chore}
                </p>
                <button
                    className='addchorebutton'
                    value={chore}
                    onClick={this.handleAddChore}
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
        );
    };

    handleAddChore = (ev) => {
        let choreToAdd = ev.target.value;
        if(!this.props.chores.includes(choreToAdd)) {
            this.props.updateChores(this.props.chores.concat(choreToAdd))
            this.updateConfirmationModal();
        } else {
            this.updateDuplicateModal();
        };
    };

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
                        className='chorenamelabel'
                        htmlFor='chorename'
                    >
                        Chore name
                    </label>
                    <input
                        className='chorename'
                        id='chorename'
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
                <div className={this.state.confirmationModal}>
                    <div className='addmodal'>
                        <p>
                            Chore added successfully!
                        </p>
                        <button
                            onClick={this.updateConfirmationModal}
                        >
                            Ok
                        </button>
                    </div>
                </div>
                <div className={this.state.duplicateModal}>
                    <div className='duplicatemodal'>
                        <p>
                            Your household already contains this core.
                        </p>
                        <button
                            onClick={this.updateDuplicateModal}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        )
    };
};