const express = require('express');
const { AdminSignUp } = require('../Controller/AuthController');
const router = express.Router();

router.post('/signup', AdminSignUp);

module.exports = router;