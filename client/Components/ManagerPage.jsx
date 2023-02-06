import React, { Component } from 'react';
import EmployeeRow from './EmployeeRow.jsx';
import deleteButton from './deleteButton.jsx';

class ManagerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section id='managerPageOutterBox'>
        <div>TimeMate</div>
        <table id='employeeTable'>
          <tr>
            <th id='employeeNameTable'>Employee</th>
            <th id='hoursWorkedTable'>Hours Worked</th>
            <th id='employeeIdTable'>Employee ID</th>
          </tr>

          {/* we want to fill this table with rows from our database, containing
          the information of the employees */}
          <EmployeeRow />
        </table>
        <deleteButton />
      </section>
    );
  }
}

export default ManagerPage;
