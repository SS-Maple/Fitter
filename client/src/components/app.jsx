import React from 'react';
import MessageButton from './messageButton.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: []
    }
  }

  render() {
    return (
      <div>HELLO

        <MessageButton />
      </div>
    )
  }
}

export default App;