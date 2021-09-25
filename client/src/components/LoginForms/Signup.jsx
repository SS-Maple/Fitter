import React, { useReducer, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../user-auth.js';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }

const Signup = ({ setView }) => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [warning, setWarning] = useState(null);
  const auth = useAuth();


  const handleChange = (e) => {
    setFormData({
      name: e.target.name,
      value: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/signin', formData)
    .then((response) => {
      if (typeof response.data === 'string' && response.data.includes('email')) {
        setWarning('This email is already in use!')
      }
      if (typeof response.data === 'string' && response.data.includes('username')) {
        setWarning('This username is already in use!')
      }
      console.log('sign up response', response.data)
      let { email, password, userId } = response.data
      auth.signup(email, password, userId);
    })
    .catch((err) => console.log('Error saving user', err))
  }

  return (
    <div className='form-page' style={{marginTop:'30%'}}>
      <div className='form-content'>
        <form onSubmit={handleSubmit}>
          <p style={{color: 'red', margin: '0px'}}>{warning}</p>
          <input type='text' placeholder='First Name' name='firstname' onChange={handleChange}></input>
          <input type='text' placeholder='Last Name' name='lastname' onChange={handleChange}></input>
          <input type='email' placeholder='Email' name='email' onChange={handleChange}></input>
          <input type='text' name='username' placeholder='Username' onChange={handleChange}></input>
          <input type='password' name='userpassword' placeholder='Password' onChange={handleChange}></input>
          <input className='form-submit' type='submit' value='Sign Up'></input>
        </form>
      </div>
      <div className='form-content'>
        <p style={{fontSize: 'smaller'}}>Have an account? <u onClick={e => setView('login')}>Log in Here</u></p>
      </div>
    </div>
  )
}

export default Signup;