import React, { Component } from 'react';
import UserInput from './UserInput.jsx';

class LoginPage extends Component {
  render() {
    return (
      //   <section id='outterLoginPageBox'>

      <section id='loginPageBox'>
        <UserInput authorize={this.props.authorize} />
      </section>
      /* </section> */
    );
  }
}

export default LoginPage;
