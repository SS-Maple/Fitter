import React from 'react';
import { useAuth } from '../user-auth.js';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();
  const auth = useAuth();

  return auth.user ? (
    <p className='logout'>
      Welcome! {`User ${auth.userId}`}
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