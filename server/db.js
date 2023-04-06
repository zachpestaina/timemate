/**
 * ************************************
 * @module  dB
 * @description Database file that will connect to the localhost postgreSQL
 * ************************************
//  */

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  // link making connection to databse
  process.env.postgres,
  { logging: false }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Connection failed');
  });

db.types = require('./models/types.model.js')(sequelize, DataTypes);
const types = db.types;
db.employees = require('./models/employees.model.js')(
  sequelize,
  DataTypes,
  types
);
const employees = db.employees;

db.logins = require('./models/logins.model.js')(
  sequelize,
  DataTypes,
  employees
);
const logins = db.logins;

db.timesheet = require('./models/timesheet.model.js')(
  sequelize,
  DataTypes,
  employees
);
const timesheet = db.timesheet;

module.exports = db;
