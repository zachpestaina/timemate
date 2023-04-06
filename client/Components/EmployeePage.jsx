import React, { Component } from 'react';
import ClockIn from './ClockIn.jsx';
import ClockOut from './ClockOut.jsx';
import LogOutButton from './logOutButton.jsx';

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
      entry_id: '',
      totalHours: '',
    };
    this.toggleClockIn = this.toggleClockIn.bind(this);
    this.getTime = this.getTime.bind(this);
    this.revealClockProof = this.revealClockProof.bind(this);
    this.clockInOut = this.clockInOut.bind(this);
  }

  render() {
    return (
      <section id='employeePageBox'>
        <section id='welcomeMessage'>Hello, {this.props.firstName}</section>
        <section id='hoursWorked'>
          You've worked {this.state.totalHours} hours this week
        </section>
        <section id='clockProofContainer'>
          {/* <section id='clockProof'>You {this.state.currentAction} at {this.state.currentTime}</section> */}
          <section id='clockProof'>{this.state.message}</section>
        </section>
        <section id='timeButtonParent'>
          <ClockIn toggleClockIn={this.toggleClockIn} />
          <ClockOut toggleClockIn={this.toggleClockIn} />
        </section>
        <section>
          <LogOutButton logOut={this.props.logOut}/>
        </section>
      </section>
    );
  }
  // on component did mount, query the database to get hours worked that week
  //fetch request with employee id and new date()
  // componentDidMount() {}
  //clockin
  //clockout
    //display current hours
    componentDidMount() {
      console.log('emp id', this.props.empId);
      fetch('http://localhost:8080/currentemphours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({emp_id: this.props.empId}),
      })
      .then((response) => {
        console.log('response', response);
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        this.setState({totalHours: data.total});
      })
      .catch((err) => {
        console.log(err);
      })
    }

  //display current hours
  // componentDidMount() {
  //   fetch('http://localhost:8080/emphours')
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     this.setState({totalHours: data});
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

  toggleClockIn(e) {
    console.log('target', e.target.id);
    let action;
    let message;
    const { time, date } = this.getTime();
    if (e.target.id === 'clockInButton') {
      if (this.state.currentAction === 'clocked in') {
        message = 'You already clocked in!';
      } else {
        action = 'clocked in';
        //send post request
        this.clockInOut(time, date, action);
        message = `You clocked in at ${time}`;
      }
    } else {
      if (this.state.currentAction === 'clocked out') {
        message = 'You already clocked out';
      } else {
        action = 'clocked out';
        //send post request
        this.clockInOut(time, date, action);
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
    return { time, date };
  }

  revealClockProof(display = 'none') {
    const clockProof = document.getElementById('clockProof');
    clockProof.style.display = display;
    return;
  }

  clockInOut(time, date, action) {
    // August 19, 1975 23:15:30
    // { time: '11:31:06', date: '2023-02-06T16:31:06.474Z', emp_id: 9 }
    console.log(action);
    if (action === 'clocked in') {
      console.log('sending fetch request');
      fetch('http://localhost:8080/clockin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: time,
          date: date,
          emp_id: this.props.empId,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log('data', data);
          this.setState({ entry_id: data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (action === 'clocked out') {
      console.log('entry_id', this.state.entry_id);
      fetch('http://localhost:8080/clockout', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: time,
          date: date,
          entry_id: this.state.entry_id,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

export default EmployeePage;
