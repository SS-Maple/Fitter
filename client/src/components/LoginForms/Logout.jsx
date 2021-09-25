import React, { useState } from 'react';
import ConfirmLogout from './ConfirmLogout.jsx';

const Logout = () => {
  const [show, setShow] = useState(false);

  return (
    <div className='logout'>
      <div className='nav-icon home' onClick={() => setShow(true)}>
          <img alt='Logout' id='logout-icon' src='https://cdn2.iconfinder.com/data/icons/user-interface-line-38/24/Untitled-5-11-1024.png'></img>
      </div>
      <ConfirmLogout show={show} setShow={setShow}/>
    </div>
  );
}

export default Logout;