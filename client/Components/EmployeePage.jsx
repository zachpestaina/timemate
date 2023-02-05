import React, { Component } from 'react';
import ClockIn from './ClockIn.jsx';
import ClockOut from './ClockOut.jsx';

class EmployeePage extends Component {
  constructor(props) {
    super(props);
    /**
     * NOTE: we can use state in this child component because
     *       it is state that is specific to only this component
     *       and does not need to be accessible to parent and / or
     *       sibling components.
     */
    this.state = {
      currentTime: '',
      currentAction: '',
      message: '',
    };
    this.toggleClockIn = this.toggleClockIn.bind(this);
    this.getTime = this.getTime.bind(this);
    this.revealClockProof = this.revealClockProof.bind(this);
  }

  render() {
    return (
      <section id='employeePageBox'>
        <section id='welcomeMessage'>Hello, Insert Employee Name Here</section>
        <section id='hoursWorked'>You've worked ___ hours this week</section>
        <section id='clockProofContainer'>
          {/* <section id='clockProof'>You {this.state.currentAction} at {this.state.currentTime}</section> */}
          <section id='clockProof'>{this.state.message}</section>
        </section>
        <section id='timeButtonParent'>
          <ClockIn toggleClockIn={this.toggleClockIn} />
          <ClockOut toggleClockIn={this.toggleClockIn} />
        </section>
      </section>
    );
  }
  // on component did mount, query the database to get hours worked that week
  // componentDidMount() {}

  toggleClockIn(e) {
    console.log('target', e.target.id);
    let action;
    let message;
    const time = this.getTime();
    if (e.target.id === 'clockInButton') {
      if(this.state.currentAction === 'clocked in') {
        message = 'You already clocked in!';
      } else {
        action = 'clocked in';
        message = `You clocked in at ${time}`;
      }
    } else {
      if (this.state.currentAction === 'clocked out') {
        message = 'You already clocked out';
      } else {
        action = 'clocked out';
        message = `You clocked out at ${time}`;
      }
    }
    this.revealClockProof('block');
    setTimeout(this.revealClockProof, 2000);
    this.setState({ currentTime: time, currentAction: action, message });
  }

  getTime() {
    const date = new Date();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const seconds =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const time = `${hours}:${minutes}:${seconds}`;
    return time;
  }

  revealClockProof(display = 'none') {
    const clockProof = document.getElementById('clockProof');
    clockProof.style.display = display;
    return;
  }
}

export default EmployeePage;
