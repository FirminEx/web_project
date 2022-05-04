const mongoose = require("mongoose");
const fs = require("fs");
const Conversation = require("../models/conversationModel")
const Message = require('../models/messageModel')


const createMessage = async (req, res) => {
    const {sender, receiver, text} = req.body;
    if(!mongoose.isValidObjectId(sender) || !mongoose.isValidObjectId(receiver)) return res.status(201).send('Incorrect sender or receiver id')
    const conversationExists = await Conversation.findOne({
        $or: [{user1: sender, user2: receiver}, {user1: receiver, user2: sender}]
    }).catch(err => {
        console.log(err)
        return res.status(201).send('Could not find the conversation')
    })
    if(!conversationExists) return res.status(201).send('Could not find the conversation') // we suppose that if the conversation exists, the users exist too
    const message = {
        sender: sender,
        receiver: receiver,
        conversation: conversationExists._id
    }
    let imgUpload = null;
    let path = null
    if(req.file) {
        path = __dirname + '/../' + req.file.path
        const img = fs.readFileSync(path)
        imgUpload = {
            data: img,
            type: req.file.mimetype
        }
        message['media'] = imgUpload
    }
    if(text) message['text'] = text
    await Message.create(message)
        .then(async responseMessage => {
            await Conversation.findOneAndUpdate({
                $or: [{user1: sender, user2: receiver}, {user1: receiver, user2: sender}]
            },
                {$addToSet: {messages: responseMessage._id}}, {new: true})
                .then(conversationResponse => res.status(200).json({message: responseMessage, conversation: conversationResponse}))
                .catch(err => {
                    console.log(err)
                    return res.status(201).send('Could not add message to the conversation')
                })
                if(imgUpload) fs.unlinkSync(path)
        })
        .catch(err =>{
            console.log(err)
            if(imgUpload) fs.unlinkSync(path)
            return res.status(201).send('Could not create the message')
        })

}

module.exports = { createMessage }