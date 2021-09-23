import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';

function FriendTile ({friends}) {
  return (
    <div>
      {friends.map((friend, index) => (
        <div
          className='pic-tile-friend-tile'
          data-testid='pic-tile-friend-tile'
          key={index}
          onClick={() => console.log('you clicked on ', friend.friendfirst, `'s tile`)}
        >
          {/* Profile Picture */}
          <div className='pic-tile-friend-left-pic'>
            <img src={friend.profilephoto}></img>
          </div>
          {/* Friend Information */}
          <div className='pic-tile-friend-right-info'>
            <b>{friend.friendfirst} {friend.friendlast}</b><p></p>
            {friend.description}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FriendTile;

