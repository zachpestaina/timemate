const express = require('express');
const { clockOut } = require('../controllers/timesheetControllers.js');

const router = express.Router();

router.patch('/', clockOut, (req, res) => {
  res.status(200).json(res.locals.entry);
});

module.exports = router;
