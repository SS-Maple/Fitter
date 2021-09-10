import React from 'react';
import { Switch, Route } from 'react-router-dom'
import FriendsList from './FriendsList/FriendsList.jsx';
import App from './App.jsx';
import Signup from './LoginForms/Signup.jsx';
import Login from './LoginForms/Login.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import Test from './HomeFeed/Test.jsx';


function Main() {
  return (
    <main>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route exact path='/' component={HomeFeed}/>
        <Route path='/friends' component={FriendsList}/>
        {/* Update below to route to a userprofile when clicked */}
        <Route path='/user' component={Test}/> 
      </Switch>
    </main>
  );
}

export default Main;