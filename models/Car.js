const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    engineSize: {
        type: Number,
        require: true
    },
    isItAutomatic: {
        type: Boolean,
        default: true
    }
})

const Car = mongoose.model('Car', carSchema)

module.exports = Car