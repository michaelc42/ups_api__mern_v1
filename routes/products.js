const express = require('express')
const router = express.Router()

const { getAllProducts, getProduct, createProduct } = require('../controllers/products')

router.route('/').post(createProduct).get(getAllProducts)//.get(getAllJobs)
router.route('/:id').get(getProduct)//.delete(deleteJob).patch(updateJob)

module.exports = router