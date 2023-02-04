//importing modules
const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../secretKey.js');
// Assigning users to the variable User
const Employees = db.employees;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res, next) => {
  try {
    const { userName, email, password, role_id } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
      role_id,
    };
    //saving the user
    const user = await User.create(data);
    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, config.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('the user was succesfully created');
      //send users details
      return next();
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
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email,
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
        const userRole = user.role_id;
        switch (userRole) {
          case 1:
            res.status(201).json('manager');
            return;
          case 2:
            res.status(201).json('employee');
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
  signup,
  login,
  //  update
};
