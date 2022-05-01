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
    likes: {
        type: Number,
        required: true,
    },
    comments: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model('Post', postSchema);