const types = require('../models/types.model.js');
const employees = require('../models/employees.model.js');

//Checks if ther is an user with the email
checkDuplicateEmail = (req, res, next) => {
  // Email
  Users.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Email is already in use!',
      });
      return;
    }

    next();
  });
};

checkRolesExisted = (req, res, next) => {
  Roles.findOne({
    where: {
      role_id: req.body.email,
    },
  }).then((role) => {
    if (role === null) {
      res.status(400).send({
        message: 'Failed! Role doesnt exist!',
      });
    }
    return next();
  });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
