import React from 'react';
import FriendProfile from './friendProfile/friendProfile.jsx';
import TopBar from './SharedComponents/TopBar.jsx';
import BottomNav from './SharedComponents/BottomNav/bottomNav.jsx';
import MyProfile from './myProfile/myProfile.jsx';
import FriendsList from './FriendsList/FriendsList.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import Login from './LoginForms/Login.jsx';
import Main from './Main.jsx';
import useToken from './LoginForms/useToken.js';


function App() {
  const { token, setToken } = useToken();

  if (!token) {

    return (
      <div>
        <TopBar />
        <Login setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <TopBar />
      {/* <FriendProfile /> */}
      {/* temporarily hidding FriendsList */}
      {/* <FriendsList /> */}
      {/* <Login /> */}
      {/* <MyProfile /> */}
      <Main />
      <BottomNav />
    </div>
  )

}

export default App;