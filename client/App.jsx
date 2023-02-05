import React, { Component } from 'react';
import LoginPage from './Components/LoginPage.jsx';
import EmployeePage from './Components/EmployeePage.jsx';
import './public/styles.css';

// const App = () => {
//   // this.checkCredentials = this.checkCredentials.bind(this);
//   const [authenticated, setAuthenticated] = useState(false);
//   const [role, setRole] = useState('');
//   const [loginFailed, setLoginFailed] = useState(false);

//   const handleLogin = async ({ username, password }) => {
//     console.log('i am logging in');
//     try {
//       const body = {
//         username,
//         password,
//       };
//       const response = await fetch('http://localhost:8080/login', {
//         method: 'POST',
//         header: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       });
//       const json = await response.json();
//       if (response.ok) {
//         console.log('i am an ok response', json);
//         setRole(json);
//         setAuthenticated(true);
//       } else {
//         console.log('Wrong Credentials');
//         setLoginFailed(true);
//       }
//     } catch (err) {
//       console.log('that was an error while loggin in', err);
//     }
//   };

//   return (
//     <Fragment>
//       {loginFailed && (
//         <div className='alert alert-danger'>WRONG CREDENTIALS</div>
//       )}
//       <div>
//         {authenticated ? (
//           <RoleBased role={'role'} />
//         ) : (
//           // <h1>I AM HERE</h1>
//           // onLogin={handleLogin}
//           <LoginPage onLogin={handleLogin} />
//           // onLogin={handleLogin}
//         )}
//       </div>
//     </Fragment>
//   );
//   // const username = document.getElementById('username').value;
//   // const password = document.getElementById('password').value;
//   // // make request to database right here
//   // // update state with whether or not credentals were correct, name of user, and role
//   // this.setState({ username, password, isLoggedIn: true });
//   // console.log(username, password);
// };

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

  componentDidMount() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/logins', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username:'workermcgee', password:'worker'}),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <EmployeePage />;
    } else {
      return <LoginPage authorize={this.checkCredentials} />;
    }
  }

  // checkCredentials() {
  //   const username = document.getElementById('username').value;
  //   const password = document.getElementById('password').value;
  //   // make request to database right here
  //   // update state with whether or not credentals were correct, name of user, and role
  //   this.setState({ username, password, isLoggedIn: true });
  //   console.log(username, password);
  // }
  checkCredentials() {
    // const username = document.getElementById('username').value;
    // const password = document.getElementById('password').value;

    // fetch('http://localhost:8080/logins', {
    //   method: 'POST',
    //   header: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({username, password}),
    // })
    //   .then((response) => {
    //     response.clone().json();
    //   })
    //   .then((data) => {
    //     console.log('data', data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log('hi');
  }


  //   async checkCredentials() {
  //     try {
  //       const username = document.getElementById('username').value;
  //       const password = document.getElementById('password').value;
  //       // console.log('i am logging in');
  //       console.log('username', username);
  //       console.log('password', password);
  //       const body = {
  //         username,
  //         password,
  //       };
  //       console.log('this is the request', body);
  //       const response = await fetch('http://localhost:8080/login', {
  //         method: 'POST',
  //         header: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(body),
  //       });
  //       const json = await response.json();
  //       if (response.ok) {
  //         console.log('i am an ok response', json);
  //         setRole(json);
  //         setAuthenticated(true);
  //       } else {
  //         console.log('Wrong Credentials Sucka');
  //         setLoginFailed(true);
  //       }
  //     } catch (err) {
  //       console.log('that was an error while loggin in', err);
  //     }
  //   }
  // }
}

export default App;
