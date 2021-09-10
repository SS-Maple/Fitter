import React from 'react';
import '../../../../dist/style.css';

const Logo = (props) => {
  return (
    <button id="logoButton" onClick={props.onClick}>
        FITTER
    </button>
  );
};

export default Logo;