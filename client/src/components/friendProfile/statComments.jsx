import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../user-auth.js';

const StatComments = (props) => {
    const location = useLocation();
    const history = useHistory();
    const auth = useAuth();


    const [userId, setId] = useState(auth.userId);
    const [name, setName] = useState('');
    const [stat, setStat] = useState('');
    const [friendId, setFriendId] = useState(location.search.split('')[10]);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
      axios.get(`/friends?friendId=${friendId}`)
      .then((response) => setName(response.data[0].firstname))
      .catch((error) => console.log('error', error))
      axios.get(`/statComment`)
        .then((response) => setComments(response.data))
        .catch((error) => console.log('error', error));
    }, [])


    return (
      <div>
        <div className='pic-tile-friend-header'>
          <img
            className='icon'
            src="https://img.icons8.com/ios-filled/50/000000/left.png"
            onClick={() => history.goBack()}
          />
          <h3>{name}'s Comments</h3>
        </div>
        {comments.map((comment, index) => (
          <div
           className='pic-tile-friend-tile'
           key={index}
          >
           <div className='pic-tile-friend-left-pic'>
             <img src={comment.photo}></img>
           </div>
           <div className='pic-tile-friend-right-info'>
            <b>{comment.username} commented on {comment.date}th: </b><p></p>
            {comment.comment}
          </div>
        </div>
        ))}
      </div>
      )
}

export default StatComments;