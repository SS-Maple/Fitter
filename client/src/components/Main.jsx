import React from 'react';
import { Switch, Route } from 'react-router-dom'
import FriendsList from './FriendsList/FriendsList.jsx';
import App from './App.jsx';
import Signup from './LoginForms/Signup.jsx';
import Login from './LoginForms/Login.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import ForgotPW from './LoginForms/ForgotPW.jsx';
import ChatMain from './Chat/ChatMain.jsx';


function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={HomeFeed} />
        <Route path='/friends' component={FriendsList} />
        <Route path='/chat' component={ChatMain} />
      </Switch>
    </main>
  );
}

export default Main;