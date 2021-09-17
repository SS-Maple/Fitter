import React from 'react';
import { useAuth } from '../user-auth.js';
import { useHistory } from 'react-router-dom';

function Logout() {
  let history = useHistory();
  let auth = useAuth();
  console.log('auth in logout', auth)
  return auth.user ? (
    <p>
      Welcome!{''}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

export default Logout;