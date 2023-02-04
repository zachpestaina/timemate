import React, { Component } from 'react';

class ClockOut extends Component {
  render() {
    return (
      <button onClick={this.props.getTime} id='clockOutButton'>
        Clock Out
      </button>
    );
  }
}

export default ClockOut;
