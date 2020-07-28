import React from 'react';
import { Link } from 'react-router-dom';
import DemoSS from './DemoSS.png';
import HouseholdSS from './HouseholdSS.png';
import JoinCreateSS from './JoinCreateSS.png';
import ManagewithAddSS from './ManagewithAddSS.png';
import './Landing.css';

export default class Landing extends React.Component {

    render() {
        return(
            <section className='landing'>
                <section className='landingsection'>
                    <h2>Its time to get organized!</h2>
                    <img className='right screenshot' src={JoinCreateSS} alt='a screenshot of the join and create household forms'/>
                    <p
                        className='landingp'
                    >
                        From washing dishes, to folding laundry, to taking out the trash there are so
                        many chores to maintain a household it can be hard to keep track.  Fiar Share
                        makes it easy to keep track of what needs to be done and who is going to do it.
                        All you have to to is set up your own household, or join an existing household 
                        that has been created by another user.
                    </p>
                </section>
                <section className='landingsection'>
                    <h2>Share the load.</h2>
                    <img className='right screenshot' src={DemoSS} alt='a screenshot of distributed chores'/>
                    <p
                        className='landingp'
                    > 
                        Once you've decided what needs to be done, the next step is to figure out who
                        will do it.  Fair Share allows you to shuffle all your household chores and
                        deal them out evenly.  That way everybody gets an equal share of the work!
                        You can even unassign and re-assign chores whenever you like.
                    </p>
                </section>
                <section className='landingsection'>
                    <h2>But what if I like folding laundry?</h2>
                    <img className='right screenshot' src={HouseholdSS} alt='a screenshot of a household where chores can be assigned'/>
                    <p
                        className='landingp'
                    >
                        Sometimes housework can be a nice break from other things.  Sometimes you may
                        enjoy folding laundry or making dinner.  Maybe you don't mind taking on an
                        extra job or two.  If there are chores you want all you have to do is click
                        a button to manually assign them into your list.  Fair Share will only 
                        randomize chores that haven't been manually assigned.
                    </p>
                </section>
                <section className='landingsection'>
                    <h2>Every household is unique.</h2>
                    <img className='right screenshot' src={ManagewithAddSS} alt='a screenshot of the manage component with the addchore form'/>
                    <p
                        className='landingp'
                    >
                        Its imporant that each user has an experience built for their needs.  Maybe you 
                        don't need to empty a litter box but instead need to feed an iguana.  Maybe 
                        instead of dropping your kids off at school you deliver groceries to an elderly 
                        neighbor.  Fair Share lets you add any chores that fit your lifestyle.
                    </p>
                </section>
                <footer className='landingfooter'>
                    <h2>Give it a try!</h2>
                    <p
                        className='footerp'
                    >
                        You can try Fair Share out for your self, or if you're already convinced sign up for your own account below!
                    </p>
                    <div
                        className='landingbuttons'
                    >
                        <Link
                            className='landinglink'
                            to='/demo'
                        >
                            <button
                                className='demobutton'
                            >
                                Demo
                            </button>
                        </Link>
                        <Link 
                            className='landinglink'
                            to='/register'
                        >
                            <button
                                className='registerbutton'
                            >
                                Register
                            </button>  
                        </Link>
                    </div>
                </footer>
            </section>
        )
    };
};