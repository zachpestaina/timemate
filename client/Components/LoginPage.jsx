import React, {Component} from 'react';
import UserInput from './UserInput.jsx';

class LoginPage extends Component {
    render() {
        return (
                <UserInput authorize = {this.props.authorize}/>
        )
    }
}

export default LoginPage;