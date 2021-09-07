import React from 'react';
import BottomNav from './bottomNav.jsx'
import UserProfile from './userProfile/userProfile.jsx';

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
        <UserProfile />
        <BottomNav handleClick={this.handleClick} />
      </div>
    )
  }
}

export default App;