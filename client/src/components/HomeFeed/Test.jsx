import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'



function Test() {

  const [term, setTerm] = useState(' ');
  const [users, setUsers] = useState([]);

  useEffect(() => {

  }, [])

  return (
    <div className='home-page-header'>
      <Link to={{ pathname: '/friends' }}>User Profile to Replace this File [Izzy]</Link>
    </div>
  );
}

export default Test;

