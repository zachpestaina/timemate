//importing modules
const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../secretKey.js');
// Assigning users to the variable User
const Employees = db.employees;
const Logins = db.logins;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, emp_role, username, password } = req.body;
    const employeeData = {
      first_name,
      last_name,
      emp_role,
    };

    //saving the user
    const user = await Employees.create(employeeData);
    const userId = user.dataValues.emp_id;
    // const userId = await Employees.findOne({
    //   where :  =

    const loginData = {
      username,
      password: await bcrypt.hash(password, 10),
      user_id: userId,
    };

    const userLogin = await Logins.create(loginData);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (userLogin) {
      let token = jwt.sign({ id: userLogin.login_id }, config.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('the user was succesfully created');
      //send users details

      return;
    } else {
      return res.status(409).send('Details are not correct');
    }
  } catch (error) {
    console.log(error);
  }
};

//login authentication

const login = async (req, res, next) => {
  try {
    console.log('you are loggin In');
    const { username, password } = req.body;
    console.log('req.body: ', req.body);
    console.log('username', username);
    console.log('password', password);

    //find a user by their email
    const user = await Logins.findOne({
      where: {
        username: username,
      },
    });

    const userRole = await Employees.findOne({
      where: {
        emp_id: user.dataValues.user_id,
      },
    });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, config.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log('You are logged in and the cookie has been created');
        //send user data
        const userType = userRole.dataValues.emp_role;
        switch (userType) {
          case 1:
            res.status(201).json('Success: Manager');
            return;
          case 2:
            res.status(201).json('Success: Worker');
            return;
          default:
            return res
              .status(401)
              .send(
                'Your user does not have a role!. Communicate with your admin'
              );
        }
      } else {
        console.log('Failed Login Attempt');
        return res.status(401).json(err);
      }
    } else {
      console.log('Failed Login Attempt');
      return res.status(401).json(err);
    }
  } catch (e) {
    return next({
      log: 'This is an error in userController',
      message: {
        err: `${e}`,
      },
    });
  }
};

// const update = async (req, res, next)

module.exports = {
  createUser,
  login,
  //  update
};
