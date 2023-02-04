import React, { Component } from 'react';

class LoginButton extends Component {
    render() {
        return (
            //have the onClick function send a post request and then 
            // on fulfillment of post request, do updater
            <button onClick = {this.props.updater}>Login</button>
        )
    }
}

export default LoginButton;