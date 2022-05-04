const express = require("express");
const {createConversation, getConversation} = require("../controller/conversationControllers");

const conversationRouter = express.Router();

conversationRouter.post('/createConversation', createConversation);
conversationRouter.post('/getConversation', getConversation)


module.exports = conversationRouter;