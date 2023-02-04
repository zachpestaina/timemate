import React, { Component } from 'react';
import LoginButton from './LoginButton.jsx';

class UserInput extends Component {
    render() {
        return (
            <section>
                <input id='username' type='text' htmlFor='username' placeholder='username'></input>
                <input id='password' type='password' htmlFor='password' placeholder='password'></input>
                <LoginButton updater = {this.props.updater}/>
            </section>
        )
    }
}

export default UserInput;