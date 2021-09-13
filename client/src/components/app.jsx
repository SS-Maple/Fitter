import React from 'react';
import TopBar from './SharedComponents/TopBar.jsx';
import BottomNav from './SharedComponents/BottomNav/bottomNav.jsx';
import MyProfile from './myProfile/myProfile.jsx';
import FriendsList from './FriendsList/FriendsList.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import Login from './LoginForms/Login.jsx';
import Main from './Main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      token: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.setToken = this.setToken.bind(this);
  }

  handleClick(e) {
    console.log(e.target.alt)
  }

  setToken(value) {
    this.setState({ token: value})
  }

  render() {
    if (!this.state.token) {
      return (
        <div>
          <TopBar />
          <Login setToken={this.setToken}/>
        </div>
      )
    }
    return (
      <div>
        <TopBar />
        {/* temporarily hidding FriendsList */}
        {/* <FriendsList />  */}
        {/* <Login /> */}
        <MyProfile />
        {/* <Main /> */}
        <BottomNav handleClick={this.handleClick} />
      </div>
    )
  }
}

export default App;