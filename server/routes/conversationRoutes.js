const express = require("express");
const {createConversation} = require("../controller/conversationControllers");

const conversationRouter = express.Router();
conversationRouter.post('/createConversation', createConversation);

module.exports = conversationRouter;