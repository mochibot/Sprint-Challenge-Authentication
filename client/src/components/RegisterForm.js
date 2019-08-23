import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = (props) => {
  const [input, setInput] = useState({
    username: '',
    password: '',
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

  const register = (event) => {
    event.preventDefault();
    axios.post(`${baseUrl}/auth/register`, input)
      .then(response => {
        props.history.push('/login');
        setInput({
          username: '',
          password: ''
        })
      })
      .catch(error => {
        console.log(error);
        setError("error registering user");
      })
  }

  return (
    <form onSubmit={register}>
      <input name='username' value={input.username} placeholder='Username' onChange={inputHandler} />
      <input type='password' name='password' value={input.password} placeholder='Password' onChange={inputHandler} />
      {error && <div>{error}</div>}
      <button>Sign up</button>
    </form>
  )
}

export default withRouter(RegisterForm);