const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const getUpsRate = async (req, res) => {


    let data = req.body
    data.RateRequest.Shipment.Shipper.ShipperNumber = process.env.UPS_SHIPPER_NUMBER
    
    const response = await fetch(process.env.UPS_API_URL, {
        method: 'POST',
        headers: {
            
            'Username': `${process.env.UPS_USERNAME}`,
            'Password': `${process.env.UPS_PASSWORD}`,
            'AccessLicenseNumber': `${process.env.UPS_ALN}`,
            'transId': 'TestTransID',
            'transactionSrc': 'TestEnvironment'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error("HTTP Error " + JSON.stringify(response.headers.raw()))
    }
    const resData = await response.json()
    res.status(StatusCodes.OK).json({ resData })   
}

module.exports={
    getUpsRate
}
