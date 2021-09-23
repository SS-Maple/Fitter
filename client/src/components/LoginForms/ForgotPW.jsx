import React, { useState } from 'react';
import { useAuth } from '../user-auth.js';

const ForgotPW = ({ setView }) => {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState();
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    auth.resetPassword(email)
    .then(() => {
      setSuccess(true)
      setMessage('Check your email for further instructions!')
    })
    .catch(() => setMessage('Email not found - Please try again'))
  }


  return (
    <div className='form-page'>
      <div className='forgot-content' style={{marginTop: '20%'}}>
        <form>
          <label className='forgot-label'>Please enter the email address for your account</label>
          <label className='forgot-label' style={{ color: success ? 'green' : 'red'}}>{message}</label>
          <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
          <input className='form-submit' type='submit' value='Reset Password' onClick={handleSubmit}></input>
        </form>
      </div>
      <u onClick={e => setView('login')}>Back to Login</u>
    </div>
  )
}

export default ForgotPW;