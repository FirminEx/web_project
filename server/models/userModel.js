const mongoose = require('mongoose')
const validator = require('email-validator')
const fs = require("fs");

const default_image = fs.readFileSync('./models/default_profile.jpg');
const buffer = Buffer.from(default_image.toString('base64'), 'base64')

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
        default: ''
    },
    date: {
        type: Date,
        required: true,
    },
    bio: {
      type: String,
      default: ''
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true,
    },
    friends: {
        type: Array,
        required: true,
        default: []
    },
    friendRequests: {
        type: Array,
        required: true,
        default: []
    },
    posts: {
        type: Array,
        required: true,
        default: []
    },
    picture: {
        data: {
            type: Buffer,
            required: true,
            default: buffer
        },
        type: {
            type: String,
            required: true,
            default: "image/jpeg"
        },
    }
});

module.exports = mongoose.model('User', userSchema);