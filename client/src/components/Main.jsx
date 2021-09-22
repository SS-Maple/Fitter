import React from 'react';
import { Switch, Route } from 'react-router-dom'
import FriendsList from './FriendsList/FriendsList.jsx';
import App from './App.jsx';
import Signup from './LoginForms/Signup.jsx';
import Login from './LoginForms/Login.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import ForgotPW from './LoginForms/ForgotPW.jsx';
import ChatMain from './Chat/ChatMain.jsx';
import MyProfile from './myProfile/myProfile.jsx';
import Line from './myProfile/charts.jsx';
import FriendProfile from './friendProfile/friendProfile.jsx';
import {userContext} from './userContext';
function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={HomeFeed} />
        <Route path='/login' component={Login} />
        <Route path='/friends' component={FriendsList} />
        <Route path='/chat' component={ChatMain} />
        <Route path='/userprofile' component={MyProfile} />
        <Route path='/friendProfile' component={FriendProfile} />
        <Route path='/chart' component={Line} />
      </Switch>
    </main>
  );
}

export default Main;

