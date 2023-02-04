import React, { Component } from 'react';

class ClockIn extends Component {
  render() {
    return (
      <button onClick={this.props.toggleClockIn} id='clockInButton'>
        Clock In
      </button>
    );
  }
}

export default ClockIn;
