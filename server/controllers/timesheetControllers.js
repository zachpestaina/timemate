const db = require('../db');

const Employees = db.employees;
const Timesheet = db.timesheet;

const clockIn = async (req, res, next) => {
  const { emp_id } = req.body;

  const clockInData = {
    emp_id,
    clock_in,
    week,
    day,
  };

  try {
    const entry = await Timesheet.create(clockInData);

    res.locals.entry = entry.dataValues;

    if (!entry) {
      throw new Error();
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

const clockOut = async (req, res, next) => {
  const { emp_id, clock_out, entry_id } = req.body;

  //   const clockOutData = {
  //     emp_id,
  //     clock_out, //// <-----
  //     entry_id,
  //   };

  /// entry id  clcok in clockout employeeid day week
  //  1         8:00 am   null    2          1 3

  // 1     8           5        2 1  3

  try {
    const entry = await Timesheet.update(
      { clock_out },
      {
        where: {
          entry_id,
        },
      }
    );

    if (!entry) {
      throw new Error();
    }

    console.log(entry);
    res.locals.entry = entry;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  clockIn: clockIn,
  clockOut: clockOut,
};
