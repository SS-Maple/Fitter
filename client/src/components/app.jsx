import React from 'react';
import TopBar from './SharedComponents/TopBar.jsx';

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
        <TopBar />
      </div>
    )
  }
}

export default App;