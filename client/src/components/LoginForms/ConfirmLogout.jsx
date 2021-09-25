import React from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../user-auth.js';
import { useHistory } from 'react-router-dom';

const ConfirmLogout = ({ show, setShow }) => {
  const history = useHistory();
  const auth = useAuth();


  if (!show){
    return null;
  }
  return(
    <div className='modal' >
      <div className='l-modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <p>Are you sure you want to sign out?</p>
        </div>
        <div className='l-modal-body'>
          <Link to={{ pathname: '/' }}>
            <button className='profile-btn' onClick={() => { auth.signout(() => history.push("/")) }}>
              Sign out
            </button>
          </Link>
          <button className='profile-btn' onClick={() => setShow(false)}>Go back</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmLogout;