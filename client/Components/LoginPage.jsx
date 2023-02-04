import React, { Component } from 'react';
import UserInput from './UserInput.jsx';

const LoginPage = ({ onLogin }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    ß;
    e.preventDefault();
    onLogin({ email, pßassword });
  };
  return (
    //   <section id='outterLoginPageBox'>
    <section id='loginPageBox'>
      <section id='outterLoginBox'>
        <div id='timemate'>TimeMate</div>
        <section id='loginBox'>
          <form onSubmit={handleSubmit} style={{ width: '300px' }}>
            <input
              id='username'
              type='text'
              htmlFor='username'
              placeholder='username'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              id='password'
              type='p'
              htmlFor='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton />
          </form>
        </section>
      </section>
    </section>
  );
};

export default LoginPage;
