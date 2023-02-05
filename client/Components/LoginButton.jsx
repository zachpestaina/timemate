import React, { Component } from 'react';

class LoginButton extends Component {
  render() {
    return (
      <button onClick={this.props.authorize} id='loginButton'>
        Login
      </button>
    );
  }
}

export default LoginButton;
