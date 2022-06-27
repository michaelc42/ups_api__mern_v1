const express = require('express')
const router = express.Router()

const { getUpsRate } = require('../controllers/ups')

router.route('/').post(getUpsRate)
//router.route().get()//.delete(deleteJob).patch(updateJob)

module.exports = router