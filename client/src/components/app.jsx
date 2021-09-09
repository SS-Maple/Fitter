import React from 'react';
import TopBar from './SharedComponents/TopBar.jsx';
import BottomNav from './SharedComponents/BottomNav/bottomNav.jsx';
import FriendsList from './FriendsList/FriendsList.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import Login from './LoginForms/Login.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    console.log(e.target.alt)
  }

  render() {
    return (
      <div>
        <TopBar />
        {/* temporarily hidding FriendsList */}
        <FriendsList /> 
        {/* <HomeFeed /> */}
        {/* <Login /> */}
        <BottomNav handleClick={this.handleClick} />
      </div>
    )
  }
}

export default App;