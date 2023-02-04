import React, { Component } from 'react';
import EmployeeRow from './EmployeeRow.jsx';

class ManagerPage extends Component {
  render() {
    return (
      <section id='managerPageOutterBox'>
        <div>TimeMate</div>
        <table id='employeeTable'>
          {/* we want to fill this table with rows from our database, containing
          the information of the employees */}
          <EmployeeRow />
        </table>
      </section>
    );
  }
}

export default ManagerPage;
