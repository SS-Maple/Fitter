import React from 'react';
import axios from 'axios';
import TopBar from './SharedComponents/TopBar.jsx';
import Notifications from './notifications/Notifications.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      userId: 1,
      notificationClick: false,
      logoClick: false,
      newNotifications: false,
      notifications: ['This is a notification', 'This is another notification'],
      successfulLogin: true
    }
  }

  notificationEventHandler() {
    console.log('Notification CLick');
    this.setState({
      notificationClick: !this.state.notificationClick,
      newNotifications: false
    });
    console.log('this.state.noticicationClick: ', this.state.notificationClick);
  }

  logoEventHandler() {
    console.log('Logo CLick');
    this.setState({
      logoClick: !this.state.logoClick
    });
    console.log('this.state.logoClick: ', this.state.logoClick);
  }

  // This needs to be called upon successful login
  generateNewNotifications() {
    // axios.get user's target goals and current values
    // If calories.goal is empty && last updated 3 days ago
    //   axios.post 'Remember to enter a calorie goal to stay on track!', userId, new, etc
    // If water.goal is empty && last updated 3 days ago
    //   axios.post 'Remember to enter a water goal to stay on track!', userId, new, etc
    // If weight.goal is empty && last updated 3 days ago
    //   axios.post 'Remember to enter a weight goal to stay on track!', userId, new, etc

    // ARE THESE NECESSARY????
    // If water.current < water.goal
    //   axios.post 'You need to drink more water to stay on track!', userId, new, etc
    // If calories.current > calories.goal
    //   axios.post 'You have exceeded your daily calorie intake!', userId, new, etc
    // If weight.current < weight.goal || weight.current > weight.goal
    //   axios.post 'What do I put here that doesn\'t sound mean!', userId, new, etc
  }

  // This needs to be called upon successful login
  getNotifications() {
    axios.get(`/notifications?userId=${this.state.userId}`)
      .then(data => {
        console.log('data from query', data);
        this.setState({
          notifications: data
        });
        axios.put(`/notifications?userId=${this.state.userId}`)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          throw new Error(err);
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  deleteNotifications() {
    console.log('Clear notifications click');
    axios.delete(`/notifications?userId=${this.state.userId}`)
      .then((data) => {
        console.log('Deleted');
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    const { notificationClick, logoClick, newNotifications, notifications, successfulLogin } = this.state;
    return (
      <div>
        <TopBar
          logoOnClick={this.logoEventHandler.bind(this)}
          notificationOnClick={this.notificationEventHandler.bind(this)}
          newNotifications={newNotifications}
          loggedIn={successfulLogin}
        />
        {
          notificationClick ? (
            <Notifications
              notifications={notifications}
              deleteNotifications={this.deleteNotifications.bind(this)}/>
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