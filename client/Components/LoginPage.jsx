import React, {Component} from 'react';
import UserInput from './UserInput.jsx';

class LoginPage extends Component {
    render() {
        return (
                <UserInput updater = {this.props.updater}/>
        )
    }
}

export default LoginPage;