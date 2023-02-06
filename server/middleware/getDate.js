const db = require('../db');

const getDate = (req, res, next) => {
  if (req.body.currentDate) {
    const { currentDate, emp_id } = req.body;

    // if currentDate is an object, comment out below line
    // currentDate.toString();

    const currentTime = currentDate.split(' ')[4];

    const dateStr = currentDate.split(' ').slice(1, 4).join('-');

    res.locals.time = currentTime;
    res.locals.date = dateStr;

    res.locals.week = currentDate.getWeek();

    return next();
  } else {
    return next({ err: 'Bad Date in getDate' });
  }
};

//
Date.prototype.getWeek = function (dowOffset) {
  /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

  dowOffset = typeof dowOffset == 'number' ? dowOffset : 0; //default dowOffset to zero
  var newYear = new Date(this.getFullYear(), 0, 1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = day >= 0 ? day : day + 7;
  var daynum =
    Math.floor(
      (this.getTime() -
        newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
        86400000
    ) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      nYear = new Date(this.getFullYear() + 1, 0, 1);
      nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      /*if the next year starts before the middle of
                the week, it is week #1 of that year*/
      weeknum = nday < 4 ? 1 : 53;
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
};

// Tues Feb 04 2023 15:42:43 GMT-0800 (Pacific Standard Time)
// 0     1   2  3

module.exports = getDate;
