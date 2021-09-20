import React, { useState } from 'react';
import { useAuth } from '../user-auth.js';

const ForgotPW = ({ setView }) => {
  const [email, setEmail] = useState();
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    auth.resetPassword(email);
  }


  return (
    <div className='form-page'>
      <div className='form-content' style={{marginTop: '20%'}}>
        <form>
          <label>Please enter the email address for your account</label>
          <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
          <input className='form-submit' type='submit' value='Reset Password' onClick={handleSubmit}></input>
        </form>
      </div>
      <u onClick={e => setView('login')}>Back to Login</u>
    </div>
  )
}

export default ForgotPW;