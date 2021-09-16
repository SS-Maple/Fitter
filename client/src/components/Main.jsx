import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FriendsList from './FriendsList/FriendsList.jsx';
import App from './App.jsx';
import Signup from './LoginForms/Signup.jsx';
import Login from './LoginForms/Login.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import ForgotPW from './LoginForms/ForgotPW.jsx';
import MyProfile from './myProfile/myProfile.jsx';
import FriendProfile from './friendProfile/friendProfile.jsx';

function Main() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomeFeed} />
          <Route path='/friends' component={FriendsList} />
          <Route path='/userprofile' component={MyProfile} />
          <Route path='/friendProfile' component={FriendProfile} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default Main;