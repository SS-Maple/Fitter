import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login.jsx';

const ChatHome = () => {
  return (
    <div>
      <Router>
        {/* Auth */}
          <Switch>
            <Route path='/' component={Login} />
          </Switch>
        {/* Auth */}
      </Router>
    </div>
  )
}

export default ChatHome;