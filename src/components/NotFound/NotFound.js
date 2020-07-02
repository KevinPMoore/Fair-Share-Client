import React from 'react';
import './NotFound.css';

export default class NotFound extends React.Component{

    render() {
        return(
            <section 
                className='notfoundpage'
            >
                <h2
                    className='notfoundheader'
                >
                    404 - Page Not Found
                </h2>
                <p
                    className='notfoundp'
                >
                    Try going back to your previous page
                </p>
            </section>
        );
    };
};