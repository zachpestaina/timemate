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
    };
    this.getTime = this.getTime.bind(this);
  }

  render() {
    return (
      <section id='employeePageBox'>
        <section id='welcomeMessage'>Hello, Insert Employee Name Here</section>
        <section id='hoursWorked'>You've worked ___ hours this week</section>
        <section id='timeButtonParent'>
          <ClockIn getTime={this.getTime} />
          <ClockOut getTime={this.getTime} />
        </section>
      </section>
    );
  }
  getTime() {
    const date = new Date();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const seconds =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const time = `${hours}:${date.getMinutes()}:${seconds}`;
    console.log(time);
    this.setState({ currentTime: time });
  }
}

// on component did mount, query the database to get hours worked that week
// functions to execute once either clock in or clock out is clicked

export default EmployeePage;
