import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Sample file to get the tiles from the friend's list: picture on right side, information on left side

function PicTileSample() {

  return (
    <div>      
      {/* Friend's List Tile */}
      {friends.map((friend, index) => (
        <div 
          className='pic-tile-friend-tile' 
          key={index} 
          onClick={() => console.log('you clicked on ', friend.firstname, `'s tile`)}
        >
          {/* Profile Picture */}
          <div className='pic-tile-friend-left-pic'>
            <img src={friend.picture}>Add your picture link here</img>
          </div> 
          {/* Information */}
          <div className='pic-tile-friend-right-info'>
            <b>Add your right column information here</b><p></p>
          </div>
        </div>
      ))}
    </div>

  );
}

export default PicTileSample;

