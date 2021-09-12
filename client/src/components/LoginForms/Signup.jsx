import React, { useReducer, useState } from 'react';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }

const Signup = ({setView}) => {
  const [formData, setFormData] = useReducer(formReducer, {});


  const handleChange = (e) => {
    setFormData({
      name: e.target.name,
      value: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData)
  }

  return (
    <div className='form-page'>
      <div className='form-content' style={{marginTop: '10%'}}>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='First Name' name='firstname' onChange={handleChange}></input>
          <input type='text' placeholder='Last Name' name='lastname' onChange={handleChange}></input>
          <input type='email' placeholder='Email' name='email' onChange={handleChange}></input>
          <select className='security-select' type='text' placeholder='Security Question' name='securityquestion' onChange={handleChange}>
            <option value="">Security Question</option>
            <option value="What is your favorite color?">What is your favorite color?</option>
            <option value="What was your first pet?">What was your first pet?</option>
            <option value="What street did you grow up on?">What street did you grow up on?</option>
            <option value="What city did you grow up in?">What city did you grow up in?</option>
            <option value="What color was your first car?">What color was your first car?</option>
          </select>
          <input type='text' name='securityanswer' placeholder='Answer' onChange={handleChange}></input>
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