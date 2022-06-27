const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async (req, res) => {
    const { name, email, password, roles } = req.body

    // if (!name || !email || !password) {
    //     throw new BadRequestError('Please provide name, email, and password.')
    // }

    
    const user = await User.create({ ...req.body })
    
    const token = user.createJWT()
    

    res.status(StatusCodes.CREATED).json({user: user.name, token, roles: user.roles})
}

const login = async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    
    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const roles = Object.values(user.roles).filter(Boolean);
    const token = user.createJWT()


    /*
        const name = jsonData?.name
        const address = jsonData?.address
        const city = jsonData?.city
        const country = jsonData?.country
        const state = jsonData?.state 
        const zipCode = jsonData?.zipCode
        const phone = jsonData?.phone
    */
    res.status(StatusCodes.OK).json({
        user: user.name, token, roles,
        name: user.name, address: user.address.street,
        city: user.address.city, country: user.address.country,
        state: user.address.state, zipCode: user.address.zipcode,
        phone: user.phone
    })

}

module.exports= {
    register,
    login
}