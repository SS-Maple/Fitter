import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../user-auth.js';

function SearchUsernames() {

  const [term, setTerm] = useState(' ');
  const [users, setUsers] = useState([]);
  const auth = useAuth();
  const [id, setId] = useState(auth.userId);

  useEffect(() => {
    axios.get(`/users`)
      .then(response => response.data)
      .then(result => setUsers(result))
      .catch(error => error);
  }, [])

  return (
    <div data-testid='home-page-header' className='home-page-header'>
      <input placeholder='Search Username...' onChange={() => setTerm(event.target.value)}></input>
      <div className='username-results'>{users.filter(name => name.username.includes(term)).map(((user, index) => (
        <Link to={`/friendProfile?friendid=${user.id}&userid=${id}`}
          key={index}
          style={{textDecoration:"none", color:'black'}}
        >
          <div className='search-user-result' >
            <img src={user.picture}></img>
            {user.firstname} {user.lastname}:  <b> {user.username}</b>
          </div>
        </Link>
      )))}</div>
    </div>
  );
}

export default SearchUsernames;

