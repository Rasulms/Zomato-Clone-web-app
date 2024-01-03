const mongoose = require('mongoose')


const allRestaurants = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
        },
        location_id: {
            type: Number,
        },
        city_id: Number,
        locality: String,
        thumb: Array,
        aggregate_rating: Number,
        rating_text: String,
        min_price: Number,
        contact_number: Number,
        cuisine: { type: Array, required: true },
        image: String,
        mealtype_id: Number
    }
)

module.exports = mongoose.model('restaurant', allRestaurants)
