import React, { Component, useState, Fragment } from 'react';
import LoginPage from './Components/LoginPage.jsx';
import EmployeePage from './Components/EmployeePage.jsx';
import './public/styles.css';

const App = () => {
  // this.checkCredentials = this.checkCredentials.bind(this);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = async ({ username, password }) => {
    try {
      const body = {
        username,
        password,
      };
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (response.ok) {
        console.log('i am an ok response', json);
        setRole(json);
        setAuthenticated(true);
      } else {
        console.log('Wrong Credentials');
        setLoginFailed(true);
      }
    } catch (err) {
      console.log('that was an error while loggin in', err);
    }
  };

  return;
  <Fragment>
    {loginFailed && <div className='alert alert-danger'>WRONG CREDENTIALS</div>}
    <div>
      {authenticated ? (
        <RoleBased role={'role'} />
      ) : (
        <LoginPage onLogin={handleLogin} />
        // onLogin={handleLogin}
      )}
    </div>
  </Fragment>;

  // const username = document.getElementById('username').value;
  // const password = document.getElementById('password').value;
  // // make request to database right here
  // // update state with whether or not credentals were correct, name of user, and role
  // this.setState({ username, password, isLoggedIn: true });
  // console.log(username, password);
};

export default App;
