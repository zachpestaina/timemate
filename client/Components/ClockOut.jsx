import React, { Component } from 'react';

class ClockOut extends Component {
  render() {
    return (
      <button onClick={this.props.toggleClockIn} id='clockOutButton'>
        Clock Out
      </button>
    );
  }
}

export default ClockOut;
