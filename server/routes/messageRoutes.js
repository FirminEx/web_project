const express = require("express");
const {createMessage} = require("../controller/messageController");
const {multerMiddleware} = require("../config/multerConfig");

const messageRouter = express.Router();

messageRouter.post('/createMessage',multerMiddleware, createMessage);

module.exports = messageRouter;