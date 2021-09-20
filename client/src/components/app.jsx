import React from 'react';
import FriendProfile from './friendProfile/friendProfile.jsx';
import TopBar from './SharedComponents/TopBar.jsx';
import BottomNav from './SharedComponents/BottomNav/bottomNav.jsx';
import MyProfile from './myProfile/myProfile.jsx';
import FriendsList from './FriendsList/FriendsList.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import Login from './LoginForms/Login.jsx';
import Main from './Main.jsx';
import Logout from './LoginForms/Logout.jsx';
import { useAuth } from './user-auth.js';

function App() {
  const auth = useAuth();
  console.log('this is the auth', auth)
  const handleClick = (e) => {
    console.log(e.target.alt)
  }

  if (!auth.userId) {
    return (
      <div>
        <TopBar />
        <Login />
      </div>
    )
  }
  return (
    <div>
      <TopBar />
      <Logout />
      {/* <FriendProfile /> */}
      <Main />
      <BottomNav handleClick={handleClick} />
    </div>
  )

}

export default App;