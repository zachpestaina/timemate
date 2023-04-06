import React, { Component } from 'react';
import EmployeeRow from './EmployeeRow.jsx';
import deleteButton from './deleteButton.jsx';
import LogOutButton from './logOutButton.jsx';

class ManagerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section id='managerPageOutterBox'>
        <div id='managerTimeMate'>TimeMate</div>
        {/* <table id='employeeTable'> */}
        {/* <tr>
            <th id='employeeNameTable'>Employee</th>
            <th id='hoursWorkedTable'>Hours Worked</th>
            <th id='employeeIdTable'>Employee ID</th>
          </tr> */}

        {/* we want to fill this table with rows from our database, containing
          the information of the employees */}
        <EmployeeRow />
        {/* </table> */}
        {/* <deleteButton /> */}
        <section id='managerLogOut'>
          <LogOutButton logOut={this.props.logOut}/>
        </section>
      </section>
    );
  }
}

export default ManagerPage;
