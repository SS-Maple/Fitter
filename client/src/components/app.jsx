import React from 'react';
import TopBar from './SharedComponents/TopBar.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      userId: 1,
      notificationClick: false,
      logoClick: false,
      newNotifications: false,
      notifications: []
    }
  }

  notificationEventHandler() {
    this.setState = {
      notificationClick: !this.state.notificationClick,
      newNotifications: false
    };
  }

  logoEventHandler() {
    this.setState = {
      logoClick: !this.state.logoClick
    };
  }

  getNotifications() {
    axios.get(`/notifications?userId=${this.props.userId}`)
      .then(data => {
        console.log('data from query', data);
        this.setState = {
          notifications: data
        };
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    const { userId, notificationClick, logoClick, newNotifications, notifications } = this.state;
    return (
      <div>
        <TopBar userId={userId}
          logoOnClick={this.logoEventHandler.bind(this)}
          notificationOnClick={this.notificationEventHandler.bind(this)}
          newNotifications={newNotifications}
        />
        {
          notificationClick ? (
            <Notifications notifications={notifications}/>
          ) : null
        }
        {
          // Logic to return to home page goes here
          // logoClick ? (
          //   <HomePage />
          // ) : null
        }
      </div>
    )
  }
}

export default App;