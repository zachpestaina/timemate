import React, { Component } from 'react';

class logOutButton extends Component {
    render () {
        return (
            <button onClick={this.props.logOut} id='logOutButton'>Log Out</button>
        );
    }
}

export default logOutButton;