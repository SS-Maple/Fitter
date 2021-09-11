import React from 'react';
import TopBar from './SharedComponents/TopBar.jsx';
import BottomNav from './SharedComponents/BottomNav/bottomNav.jsx';
import Login from './LoginForms/Login.jsx';
import DirectChatPage from './Chat/DirectChatPage.jsx';
// import ChatHome from './Chat/ChatHome.jsx';


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
        {/* <TopBar />
        <Login /> */}
        <DirectChatPage name='Maple' secret='meatball'/>
        {/* <ChatHome /> */}
        {/* <BottomNav handleClick={this.handleClick} /> */}
      </div>
    )
  }
}

export default App;