import React from 'react';

const Signup = () => {
  return (
    <div className='form-page'>
      <div className='form-content'>
        <form>
          <input type='text' placeholder='First Name'></input>
          <input type='text' placeholder='Last Name'></input>
          <input type='email' placeholder='Email'></input>
          <input type='text' placeholder='Security Question'></input>
          <input type='text' placeholder='Answer'></input>
          <input type='text' placeholder='Username'></input>
          <input type='text' placeholder='Password'></input>
          <input className='form-submit' type='submit' value='Sign Up'></input>
        </form>
      </div>
      <div className='form-content'>
        <p style={{fontSize: 'smaller'}}>Have an account? <u>Log in Here</u></p>
      </div>
    </div>
  )
}

export default Signup;