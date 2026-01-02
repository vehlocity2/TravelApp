const express = require('express')
const verifyToken = require('../Middlewares/ValidateToken')
const { createTransaction, webHookHandler } = require('../Controller/TransactionController')
const router = express.Router()

router.post('/transaction/:tripId', verifyToken, createTransaction)
router.post('/webhook/flutterwave',  webHookHandler)

module.exports = router