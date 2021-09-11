import React from 'react';
import TopBar from './SharedComponents/TopBar.jsx';
import BottomNav from './SharedComponents/BottomNav/bottomNav.jsx';
import FriendsList from './FriendsList/FriendsList.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import Login from './LoginForms/Login.jsx';
<<<<<<< HEAD
import DirectChatPage from './Chat/DirectChatPage.jsx';
// import ChatHome from './Chat/ChatHome.jsx';

=======
import Main from './Main.jsx';
>>>>>>> main

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
<<<<<<< HEAD
        {/* <TopBar />
        <Login /> */}
        <DirectChatPage name='Maple' secret='meatball'/>
        {/* <ChatHome /> */}
        {/* <BottomNav handleClick={this.handleClick} /> */}
=======
        <TopBar />
        <Main />
        <BottomNav handleClick={this.handleClick} />
>>>>>>> main
      </div>
    )
  }
}

export default App;