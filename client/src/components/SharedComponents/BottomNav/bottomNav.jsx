import React from 'react';
import { Link } from 'react-router-dom'

const BottomNav = ({ handleClick }) => {

  return (
    <div className='bottom-nav'>
      <div className='nav-icon home' onClick={(e) => handleClick(e)}>
        <Link to={{ pathname: '/' }}>
          <img alt='Home' className='icon' src='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_home_48px-1024.png'></img>
        </Link>
      </div>
      <div className='nav-icon chat' onClick={(e) => handleClick(e)}>
        <Link to={{ pathname: '/chat' }}>
          <img alt='Chat' className='icon' src='https://cdn4.iconfinder.com/data/icons/top-search-6/128/_chat_communication_message_typing_launcher_conversation_talk_bubble-512.png'></img>
        </Link>
      </div>
      <div className='nav-icon profile' onClick={(e) => handleClick(e)}>
        <img alt='User Profile' className='icon' src='https://cdn3.iconfinder.com/data/icons/user-2/100/9-1024.png'></img>
      </div>
    </div>
  )
}

export default BottomNav;