import React, { Component } from 'react';

class EmployeeRow extends Component {
  render() {
    return (
      <div id='rowContainer'>
        <div id='nameContainer'></div>
        <div id='hoursContainer'></div>
        <div id='employeeIdContainer'></div>
      </div>
    );
  }
}
export default EmployeeRow;
