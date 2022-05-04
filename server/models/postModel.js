const mongoose = require('mongoose')
const fs = require("fs");

const default_image = fs.readFileSync('./models/default_profile.jpg');
const buffer = Buffer.from(default_image.toString('base64'), 'base64')

const postSchema = mongoose.Schema({
    author: {
        type: String,
        required: [true, 'An author is required']
    },
    authorID: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    text: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true,
    },
    likers: {
        type: Array,
        required: true,
        default: [],
    },
    comments: {
        type: Array,
        required: true,
        default: [],
    },
    media: {
        data: {
            type: Buffer
        },
        type: {
            type: String
        },
    },
    authorPicture: {
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

module.exports = mongoose.model('Post', postSchema);