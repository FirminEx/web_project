const mongoose = require('mongoose')

const messageModel = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "A message needs a sender"]
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "A message needs a receiver"]
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "A message should be inside a conversation"]
    },
    text: {
        type: String
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

module.exports = mongoose.model('Message', messageModel);