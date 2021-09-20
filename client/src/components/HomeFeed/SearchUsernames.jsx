import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link,useLocation,useHistory, useParams } from 'react-router-dom';


function SearchUsernames() {

  const [term, setTerm] = useState(' ');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`/users`)
      .then(response => response.data)
      .then(result => setUsers(result))
      .catch(error => error);
  }, [])

  return (
    <div className='home-page-header'>
      <input placeholder='Search Username...' onChange={() => setTerm(event.target.value)}></input>
      <div className='username-results'>{users.filter(name => name.username.includes(term)).map(((user, index) => (        
        <div className='search-user-result' key={index} onClick={() => console.log('On click needs to route to', user.firstname)}>
          <img src={user.picture}></img>
          {user.firstname} {user.lastname}: <b> {user.username}</b>
        </div>
      )))}</div>
    </div>
  );
}

export default SearchUsernames;

