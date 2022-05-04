const mongoose = require("mongoose");
const User = require('../models/userModel')
const Conversation = require('../models/conversationModel')

// user1, user2 are id
const createConversation = async (req, res) => {
    const {user1, user2} = req.body;
    if(!mongoose.isValidObjectId(user1) || !mongoose.isValidObjectId(user2)) return res.status(201).send('One of the id is incorrect')

    if(user1 === user2) return res.status(201).send('Cannot create conversation between one user')

    const verifyUser1 = await User.findById(user1)
    if(!verifyUser1) return res.status(201).send('Could not find user 1')

    const verifyUser2 = await User.findById(user2)
    if(!verifyUser2) return res.status(201).send('Could not find user 2')

    if(!verifyUser1.friends.includes(user2) || !verifyUser2.friends.includes(user1)) return res.status(201).send('Users are not friends');

    const conversation = await Conversation.findOne({
        $or: [{user1: user1, user2: user2}, {user1: user2, user2: user1}]
    })
    if(conversation) {
        return res.status(201).send('Conversation already exists')
    }

    await Conversation.create({user1: user1, user2: user2})
        .then(response => res.status(200).json(response))
        .catch(err => {
            console.log(err)
            res.status(201).send('Could not create the user');
        })
}

// user1, user2 are id
const getConversation = async (req, res) => {
    const {user1, user2} = req.body;
    if(!mongoose.isValidObjectId(user1) || !mongoose.isValidObjectId(user2)) return res.status(201).send('One of the id is incorrect')

    const verifyUser1 = await User.findById(user1)
    if(!verifyUser1) return res.status(201).send('Could not find user 1')

    const verifyUser2 = await User.findById(user2)
    if(!verifyUser2) return res.status(201).send('Could not find user 2')

    await Conversation.find({
        $or: [{user1: user1, user2: user2}, {user1: user2, user2: user1}]
    })
        .then(response => res.status(200).json(response))
        .catch(err => {
            console.log(err)
            return res.status(201).send('Could not find the conversation')
        })

}

module.exports = { createConversation, getConversation }