const express = require('express')
const router = express.Router()

const { getAllJobs, getJob, createJob, updateJob, deleteJob,getEveryonesJob } = require('../controllers/jobs')

router.route('/').post(createJob).get(getEveryonesJob)//.get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router