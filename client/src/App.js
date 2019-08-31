import React from 'react';
import { Route } from 'react-router-dom'
import PrivateRoute from './utilities/PrivateRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

const App = () => {
  return (
    <div class='app'>
      <Route exact path='/' component={Home} />
      <Route path='/signup' component={Register} />
      <Route path='/login' component={Login} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
    </div>
  );
}

export default App;
