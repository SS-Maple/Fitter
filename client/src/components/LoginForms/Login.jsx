import React, { useState } from 'react';
import axios from 'axios';
import Signup from './Signup.jsx';
import ForgotPW from './ForgotPW.jsx';
import { useAuth } from '../user-auth.js';

const Login = () => {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = useAuth();

  if (view === 'signup') {
    return <Signup setView={setView} />
  }

  if (view === 'forgot') {
    return <ForgotPW />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      email,
      password
    }

    axios.post('/login', body)
    .then((response) => {
      let id = response.data.userId;
      auth.signin(email, password, id)
    })
    .catch((err) => console.log('Error logging in', err))
  }

  if (view === 'login') {
    return (
      <div className='form-page'>
        <div className='form-content' style={{marginTop: '25%'}}>
          <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
            <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
            <input className='form-submit' type='submit' value='Login' ></input>
          </form>
          <p style={{fontSize: 'small'}}>Need help logging in? <u onClick={e => setView('forgot')}>Click Here</u></p>
        </div>
        <div className='form-content'>
          <p style={{fontSize: 'smaller'}}>Don't have an account? <u onClick={e => setView('signup')}>Sign Up Here</u></p>
        </div>
      </div>
    )
  }
}

export default Login;