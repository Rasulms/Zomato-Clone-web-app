const mongoose = require('mongoose')


const UserInfo = mongoose.Schema(
    {
        username: String,
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        password: { type: String },
        phoneNumber: Number,
    }
)
module.exports = mongoose.model('userInfo', UserInfo)