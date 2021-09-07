import React, { useState } from 'react';

const ForgotPW = () => {
  const [userExists, setUserExists] = useState(false);
  const [verified, setVerified] = useState(false);


  if (!userExists) {
    return (
      <div className='form-page'>
        <div className='form-content'>
          <form>
            <label>Please enter the email address for your account</label>
            <input type='email' placeholder='Email'></input>
            <input className='form-submit' type='submit' value='Submit' onClick={e => setUserExists(true)}></input>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className='form-page'>
        <div className='form-content'>
          <form>
            <label style={{margin: '10px'}}>Complete your security question and create a new password</label>
            <label>What was your first pet?</label>
            <input type='text' placeholder='Answer'></input>
            <input type='text' placeholder='New Password'></input>
            <input className='form-submit' type='submit' value='Reset Password'></input>
          </form>
        </div>
      </div>
  )
}

export default ForgotPW;