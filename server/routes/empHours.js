const express = require('express');
const getDate = require('../middleware/getDate');

const router = express.Router();

router.get('/', getDate, (req, res) => {});
