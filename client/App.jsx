import React, { Component } from 'react';
import LoginPage from './Components/LoginPage.jsx';
import EmployeePage from './Components/EmployeePage.jsx';
import './public/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
    };
    this.checkCredentials = this.checkCredentials.bind(this);
  }

  render() {
    if (this.state.isLoggedIn) {
      return <EmployeePage />;
    } else {
      return <LoginPage authorize={this.checkCredentials} />;
    }
  }

  checkCredentials() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // make request to database right here
    // update state with whether or not credentals were correct, name of user, and role
    this.setState({ username, password, isLoggedIn: true });
    console.log(username, password);
  }
}

export default App;
