import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


function HomeFeed() {


  useEffect(() => {

  }, [])
  
  return (
    <div id='home-page'> 
      {/* Home Feed Search */}
      <div className='home-page-header'>
        <input placeholder='Search Username...'></input>
      </div>

      {/* Placeholder for Personal Stats [Simon] */}
      <div className='home-placeholder'>
        Placeholder for Daily/Weekly Status
      </div>
      
      <h4>Your Friend's Rankings: </h4>
      {/* Friend's List Tile */}
        <div 
          className='pic-tile-friend-tile' 
          onClick={() => console.log('you clicked on a tile')}
          >
          <div className='pic-tile-ranking'>
            #1
          </div>
          {/* Profile Picture */}
          <div className='pic-tile-friend-left-pic'>
            <img src=''></img>
          </div> 
          {/* Friend Information */}
          <div className='pic-tile-friend-right-info'>
            
          </div>
        </div>
    </div>

  );
}

export default HomeFeed;

