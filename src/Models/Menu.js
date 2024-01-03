const mongoose = require('mongoose')


const Menu = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        city: String,
        min_price: Number,
        mealtype_id: Number,
        mealtype_name: String,
        hotel_id: Number,
        menu: { type: Array, required: true }

    }
)

module.exports = mongoose.model('MenuDetail', Menu)
