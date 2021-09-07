import React from 'react';
import '../../../../dist/style.css';

class Logo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  onClick() {
    console.log('Logo click');
  }

  render() {
    return (
      <button id="logoButton" onClick={this.onClick.bind(this)}>
          FITTER
      </button>
    )
}
};

export default Logo;