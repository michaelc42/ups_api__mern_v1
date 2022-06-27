const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: [true, 'Please provide product name'],
        minLength: 3,
        maxLength: 50,

    },
    brand: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    aggregateRating: {
        type: Number
    },
    productMeasurements: {
        height: {
            type: Number
        },
        width: {
            type: Number
        },
        length: {
            type: Number
        },
        weight: {
            type:Number
        }
    },
    shippingMeasurements: {
        height: {
            type: Number
        },
        width: {
            type: Number
        },
        length: {
            type: Number
        },
        weight: {
            type:Number
        }
    },
    model: {
        type: String
    }, 
    imageSrc: {
        type: String
    }
})

module.exports = mongoose.model('Products', ProductSchema)

