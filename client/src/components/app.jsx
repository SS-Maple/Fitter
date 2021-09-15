import React from 'react';
import FriendProfile from './friendProfile/friendProfile.jsx';
import TopBar from './SharedComponents/TopBar.jsx';
import BottomNav from './SharedComponents/BottomNav/bottomNav.jsx';
import MyProfile from './myProfile/myProfile.jsx';
import FriendsList from './FriendsList/FriendsList.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import Login from './LoginForms/Login.jsx';
import Main from './Main.jsx';
import {userContext} from './userContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 3,
      test: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    console.log(e.target.alt)
  }

  render() {
    return (
      <div>
        <TopBar />
        {/* <FriendProfile /> */}
        {/* temporarily hidding FriendsList */}
        {/* <FriendsList /> */}
        {/* <Login /> */}
        {/* <MyProfile /> */}
        <userContext.Provider userId={this.state.userId}>
          <Main/>
        </userContext.Provider>
        <BottomNav handleClick={this.handleClick} />
      </div>
    )
  }
}

export default App;