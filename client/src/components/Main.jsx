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
import {userContext} from './userContext';
function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={HomeFeed} />
        {/* <userContext.Consumer>
          {({value}) => {
            <Route exact path='/' component={HomeFeed} userId={value}/>
          }} */}
        {/* </userContext.Consumer> */}
        <Route path='/friends' component={FriendsList} />
        <Route path='/userprofile' component={MyProfile} />
        <Route path='/friendProfile' component={FriendProfile}/>
        {/* <userContext.Consumer>
          {({userId}) => {
            <Route path={`/friendProfile?userId=${friend.friendid}`} component={FriendProfile} userId={userId}/>
          }}
        </userContext.Consumer> */}
      </Switch>
    </main>
  );
}

export default Main;

