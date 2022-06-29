const express = require('express')
const router = express.Router()

const { getUpsRate } = require('../controllers/ups')

router.route('/').post(getUpsRate)

module.exports = router