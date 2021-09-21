import React from 'react';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  return (
    // <button id="logoButton" onClick={props.onClick}>
    <Link id="logoButton" to="/">FITTER</Link>
    // </button>
  );
};

export default Logo;