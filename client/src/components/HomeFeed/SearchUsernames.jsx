import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function SearchUsernames() {

  const [term, setTerm] = useState(' ');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users')
      .then(response => response.data)
      .then(result => setUsers(result))
      .catch(error => error);
  }, [])

  return (
    <div className='home-page-header'>
      <input placeholder='Search Username...' onChange={() => setTerm(event.target.value)}></input>
      <div>{users.filter(name => name.username.includes(term)).map(((user, index) => (
       <Link to={{ pathname: '/user' }}>
       <div className='search-user-result' key={index} onClick={() => console.log(user.firstname)}>{user.firstname} {user.lastname}: {user.username}
        </div>
        </Link>
      )))}</div>
      
    </div>
  );
}

export default SearchUsernames;

