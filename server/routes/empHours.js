const express = require('express');
const { timesheet } = require('../db');
const getDate = require('../middleware/getDate');

const router = express.Router();

router.get(
  '/',
  getDate,
  // timesheetControllers,
  (req, res) => {}
);

module.exports = router;
