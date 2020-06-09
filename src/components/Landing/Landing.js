import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

class Landing extends React.Component {

    render() {
        return(
            <section className='landing'>
                <section className='landingsection'>
                    <h3>Its time to get organized!</h3>
                    <div className='right screenshot'>Screenshot of demo house with chore list</div>
                    <p>
                    From washing dishes, to folding laundry, to taking out the trash there are so
                    many chores to maintain a household it can be hard to keep track.  Fiar Share
                    makes it easy to keep track of what needs to be done and who is going to do it.
                    </p>
                </section>
                <section className='landingsection'>
                    <h3>Share the load.</h3>
                    <div className='right screenshot'>Screenshot of chores randomly distributed</div>
                    <p> 
                    Once you've decided what needs to be done, the next step is to figure out who
                    will do it.  Fair Share allows you to shuffle all your household chores and
                    deal them out evenly.  That way everybody gets an equal share of the work!
                    </p>
                </section>
                <section className='landingsection'>
                    <h3>But what if I like folding laundry?</h3>
                    <div className='right screenshot'>Screenshot of drag and drop chores</div>
                    <p>
                    Sometimes housework can be a nice break from other things.  Sometimes you may
                    not mind folding laundry or making dinner.  Maybe you don't mind taking on an
                    extra job or two.  If there are chores you want all you have to do is drag and drop them into your list.  You can do this at any time, before or after Fair 
                    Share has assigned things!
                    </p>
                </section>
                <section className='landingsection'>
                    <h3>Every household is unique.</h3>
                    <div className='right screenshot'>Screenshot of adding chores</div>
                    <p>
                    While Fair Share comes with a list of common chores already, its imporant that each user has an experience built for their needs.  Maybe you don't need to empty
                    a litter box but instead need to feed an iguana.  Maybe instead of dropping your
                    kids off at school you deliver groceries to an elderly neighbor.  Fair Share lets
                    you add chores that fit your lifestyle.
                    </p>
                </section>
                <footer className='landingfooter'>
                    <h3>Give it a try!</h3>
                    <p>
                    You can try Fair Share out for your self, or if you're already convinced sign up for your own account below!. 
                    </p>
                    <button>Demo the app</button>
                    <button>Register</button>
                </footer>
            </section>
        )
    }
}

export default Landing;