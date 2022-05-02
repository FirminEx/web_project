const mongoose = require('mongoose')
const validator = require('email-validator')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, 'An author is required']
    },
    password: {
        type: String,
        required: [true, "A password is needed"]
    },
    mail: {
        type: String,
        unique: true,
        required: [true, 'An email is required'],
        validate: [validator.validate, 'invalid email']
    },
    phone: {
        type: Number,
        required: false,
    },
    place: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true,
    }
});

module.exports = mongoose.model('User', userSchema);