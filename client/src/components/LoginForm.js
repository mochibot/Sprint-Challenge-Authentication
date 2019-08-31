import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const LoginForm = (props) => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('');

  const inputHandler = (event) => {
    setError('');
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  const baseUrl = 'http://localhost:3300/api';

  const login = (event) => {
    event.preventDefault();
    axios.post(`${baseUrl}/auth/login`, input)
      .then(response => {
        localStorage.setItem('user-token', response.data.token);
        props.history.push('/dashboard');
      })
      .catch(error => {
        console.log(error);
        setError('error logging in');
      })
  }

  return (
    <form onSubmit={login}>
      <input name='username' value={input.username} placeholder='Username' onChange={inputHandler} />
      <input type='password' name='password' value={input.password} placeholder='Password' onChange={inputHandler} />
      {error && <div>{error}</div>}
      <button>Log in</button>
    </form>
  )
}

export default withRouter(LoginForm);