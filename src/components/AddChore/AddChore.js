import React from 'react';
import HouseholdService from '../../services/households-api-service';
import ChoreService from '../../services/chores-api-service';
import './AddChore.css';

//Bugfix:

export default class AddChore extends React.Component {
    state = {
        choresArray: [],
        formname: '',
        modal: 'hide',
        modalMessage: ''
    };

    updateFormName = (ev) => {
        this.setState({
            formname: ev.target.value
        });
    };

    updateModal = () => {
        if(this.state.modal === 'hide') {
            this.setState({
                modal: 'modal'
            })
        } else {
            this.setState({
                modal: 'hide'
            })
        };
    };

    setStateFromServer = () => {
        HouseholdService.getHouseholdChores(this.props.household.householdid)
        .then(res =>
            this.setState({
                choresArray: res
            })
        )
    };

    //Sends a post request for a new chore with the householdid as chorehousehold
    handleAddChore = () => {
        ChoreService.postChore(this.state.formname, this.props.household.householdid)
        .then(
            this.setStateFromServer()
        );
    };

    //Validates that the chore being added is not already in the household then calls handleAddChore
    setChoreModal = (ev) => {
        ev.preventDefault();
        let message = '';

        this.state.choresArray.forEach(chore => {
            if(chore.chorename.toLowerCase() === this.state.formname.toLowerCase()) {
                message = `${this.props.household.householdname} already has this chore.`;
            };
        });

        if(message !== '') {
            this.setState({
                modalMessage: message,
                formname: ''
            });
        } else {
            this.setState({
                modalMessage: `${this.state.formname} successfully added to ${this.props.household.householdname}`,
                formname: ''
            });
            this.handleAddChore();
        };

        this.updateModal();
    };

    renderChoreModal = () => {
        return(
            <div
                className={this.state.modal}
            >
                <div
                    className='addmodal'
                >
                    <p>
                        {this.state.modalMessage}
                    </p>
                    <button
                        className='modalconfirmbutton'
                        onClick={this.updateModal}
                    >
                        Confirm
                    </button>
                </div>

            </div>
        );
    };

    componentDidMount() {
        this.setStateFromServer();
    };

    render() {
        return(
            <div
                className='addchore'
            >
                <form
                    className='addchoreform'
                    onSubmit={this.setChoreModal}
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
                        value={this.state.formname}
                        onChange={this.updateFormName}
                        required
                    >
                    </input>
                    <button
                        className='newchorebutton'
                        type='submit'
                    >
                        Add Chore
                    </button>
                </form>
                {this.renderChoreModal()}
            </div>
        );
    };
};