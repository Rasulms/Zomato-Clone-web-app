const mongoose = require('mongoose')


const allMeal = mongoose.Schema(
    {
        name: String,
        content: String,
        image: String,
        meal_type: Number
    }
)
module.exports = mongoose.model('mealType', allMeal)