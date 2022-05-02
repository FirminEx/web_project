const mongoose = require('mongoose')

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
    }
});

module.exports = mongoose.model('Post', postSchema);