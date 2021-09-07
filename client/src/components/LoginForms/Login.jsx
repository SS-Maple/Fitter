import React, { useState } from 'react';
import Signup from './Signup.jsx';
import ForgotPW from './ForgotPW.jsx';

const Login = () => {
  const [view, setView] = useState('login')

  if (view === 'signup') {
    return <Signup />
  }

  if (view === 'forgot') {
    return <ForgotPW />
  }

  if (view === 'login') {
    return (
      <div className='form-page'>
        <div className='form-content'>
          <form>
            <input type='text' placeholder='Email'></input>
            <input type='text' placeholder='Password'></input>
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