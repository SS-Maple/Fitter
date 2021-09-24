import React from 'react';
import { Switch, Route } from 'react-router-dom'
import FriendsList from './FriendsList/FriendsList.jsx';
import App from './App.jsx';
import Signup from './LoginForms/Signup.jsx';
import Login from './LoginForms/Login.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import ForgotPW from './LoginForms/ForgotPW.jsx';
import MyProfile from './myProfile/myProfile.jsx';
import FriendProfile from './friendProfile/friendProfile.jsx';
import Notifications from './notifications/Notifications.jsx';
import Line from './myProfile/charts.jsx';
import {userContext} from './userContext';

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={HomeFeed} />
        <Route path='/friends' component={FriendsList} />
        <Route path='/userprofile' component={MyProfile} />
        <Route path='/friendProfile' component={FriendProfile} />
        <Route path='/notifications' component={Notifications} />
        <Route path='/chart' component={Line} />
        <Route path='/signup' component={Signup} />
        <Route path='/forgotpw' component={ForgotPW} />
      </Switch>
    </main>
  );
}

export default Main;

