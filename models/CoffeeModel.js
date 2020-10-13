const mongoose = require('mongoose')
const Scheme = mongoose.Schema

const coffeeSchema = new Scheme(
    {
        name: String,
        price: Number
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const CoffeeModel = mongoose.model('Coffee', coffeeSchema)

module.exports = CoffeeModel