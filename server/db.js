/**
 * ************************************
 * @module  dB
 * @description Database file that will connect to the localhost postgreSQL
 * ************************************
//  */

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  // link making connection to databse
  'postgres://ceysbnlp:8OboVpyfMuX_QI8djNAKa4l2jPempgch@salt.db.elephantsql.com/ceysbnlp'
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
    console.log('i did not connect');
  });

db.types = require('./models/types.model.js')(sequelize, DataTypes);
const types = db.types;
db.employees = require('./models/employees.model.js')(
  sequelize,
  DataTypes,
  types
);
const employees = db.types;

db.logins = require('./models/logins.model.js')(
  sequelize,
  DataTypes,
  employees
);

types.findOrCreate({
  where: { role_id: 1 },
  defaults: {
    employee_type: 'manager',
  },
});

module.exports = db;
