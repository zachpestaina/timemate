import React, { Component } from 'react';
import ClockIn from './ClockIn.jsx';
import ClockOut from './ClockOut.jsx';

class EmployeePage extends Component {
        /**
     * NOTE: we can use state in this child component because
     *       it is state that is specific to only this component
     *       and does not need to be accessible to parent and / or
     *       sibling components.
     */
    render() {
        return (
            <section>
            <section>Hello, Insert Employee Name Here</section>
            <section>You've worked ___ hours this week</section>
            <ClockIn />
            <ClockOut />
            </section>
        )
    }
}

// on component did mount, query the database to get hours worked that week
// functions to execute once either clock in or clock out is clicked

export default EmployeePage;