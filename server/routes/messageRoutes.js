const express = require("express");
const {createMessage, getMessage} = require("../controller/messageController");
const {multerMiddleware} = require("../config/multerConfig");

const messageRouter = express.Router();

messageRouter.post('/createMessage',multerMiddleware, createMessage);
messageRouter.post('/getMessage', getMessage)

module.exports = messageRouter;