const Products = require('../models/Products')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllProducts = async (req, res) => {
    const products = await Products.find().sort('aggregateRating')
    res.status(StatusCodes.OK).json({ products , count:products.length})
}

const getProduct = async (req, res) => {
    const { params: { id: productId } } = req

    const product = await Products.findOne({ _id: productId })
    
    if (!product) {
        throw new NotFoundError(`Product not found with ID: ${productId}`)
    }

    res.status(StatusCodes.OK).json({product})
}
const createProduct = async (req, res) => {
    const product = await Products.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}

module.exports={
    getAllProducts,
    getProduct,
    createProduct
}