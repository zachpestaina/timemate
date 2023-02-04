import React, { Component } from 'react';
import LoginPage from './Components/LoginPage.jsx';
import EmployeePage from './Components/EmployeePage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        isLoggedIn: false,
    }
    this.update = this.update.bind(this);
  }

  render() {
    // return (
    //     <LoginPage updater = {this.update} />
    // )
    if (this.state.isLoggedIn) {
        return (
            <EmployeePage />
        )
    } else {
        return (
            <LoginPage updater = {this.update} />
        )
    }
  }

  update(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    this.setState({username, password, isLoggedIn: true});
    console.log(username, password);
  }
}

export default App;