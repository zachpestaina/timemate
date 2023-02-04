import React, { Component } from 'react';
import LoginButton from './LoginButton.jsx';

class UserInput extends Component {
    render() {
        return (
            <section>
                <input id='username' type='text' htmlFor='username' placeholder='username'></input>
                <input id='password' type='password' htmlFor='password' placeholder='password'></input>
                <LoginButton authorize = {this.props.authorize}/>
            </section>
        )
    }
}

export default UserInput;