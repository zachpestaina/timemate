const express = require('express');
const userAuth = require('../middleware/userAuth');
const employeeController = require('../controllers/employees.controller');
const { login, createUser } = employeeController;
const router = express.Router();

// router.post('/', (req, res) => {
//     res.status(200).json()
// });
router.post('/login', login);
router.post('/create', userAuth.emailCheck, createUser);
router.post('/ClockIN', login);

module.exports = router;

// controller
// const { username, password } = req.body;
//   if (username && password) {
//     // $1 $2 ?
//     queryText = 'SELECT * FROM ___ WHERE username = $1 AND password = $2';
//     //rename 'db' to correct name
//     db.query(queryText)
//       .then((result) => {})
//       .catch((err) =>
//       next({}))
//   }
