const db = require('../db');
const employees = db.employees;
const getAll = (req, res, next) => {
  employees
    .findAll()
    .then((response) => {
      res.locals.employees = response;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

const employeesMiddle = {
  getAll: getAll,
};
module.exports = employeesMiddle;
