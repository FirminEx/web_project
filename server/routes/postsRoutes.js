const express = require('express');
const { getPosts, newPost} = require('../controller/postsControllers')
const { multerMiddleware } = require('../config/multerConfig')

const postsRouter = express.Router();
postsRouter.get('/', getPosts);
postsRouter.post('/', multerMiddleware, newPost)

module.exports = postsRouter;

