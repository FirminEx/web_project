const mongoose = require('mongoose')

const conversationModel = mongoose.Schema({
    user1: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "A conversation is better between 2 people (1)"]
    },
    user2: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "A conversation is better between 2 people (2)"]
    },
    messages: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Conversation', conversationModel);