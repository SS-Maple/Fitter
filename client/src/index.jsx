import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { ProvideAuth } from './components/user-auth.js';

ReactDOM.render((
  <ProvideAuth >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProvideAuth>
), document.getElementById('app'));
