import axios from 'axios';
import React, { useState, useEffect } from 'react';


function SearchUsernames() {

  const [term, setTerm] = useState(' ');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users')
      .then(response => response.data)
      .then(result => setUsers(result))
      .catch(error => error);
    console.log('running effect')
  }, [])


  return (
    <div className='home-page-header'>
      {console.log(users)}
      <input placeholder='Search Username...' onChange={() => setTerm(event.target.value)}></input>
        <div>{users.filter(name => name.username.includes(term)).map((user => (
          <li>{user.firstname} {user.lastname}: {user.username}</li>
        )))}</div>
    </div>
  );
}

export default SearchUsernames;

