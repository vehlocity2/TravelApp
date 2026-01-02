const express = require('express');
const { Signup, SignIn, getCurrentUser } = require('../Controller/AuthController');
const verifyToken = require('../Middlewares/ValidateToken');
const router = express.Router()

router.post('/signup', Signup)
router.post('/signin', SignIn)
router.get('/me', verifyToken, getCurrentUser)


module.exports= router