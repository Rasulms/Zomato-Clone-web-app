const mongoose = require('mongoose')


const RestaurantDetail = mongoose.Schema(
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
        thumb: Array,
        rating_text: String,
        min_price: Number,
        contact_number: Number,
        image: String,
        mealtype_id: Number,
        mealtype_name: String,
        hotel_id: Number,
        about: String,
        address: String

    }
)

module.exports = mongoose.model('RestaurantDetails', RestaurantDetail)
