import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem('user-token');
  } 

  return (
    <header>
      <div>Dad Jokes App</div>
      <NavLink to='/signup'>Register</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/dashboard'>Dashboard</NavLink>
      <NavLink to='/' onClick={logout}>Logout</NavLink>
    </header>
  )
}

export default NavBar;