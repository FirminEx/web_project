const express = require('express');
const { getPosts, newPost, likePost} = require('../controller/postsControllers')
const { multerMiddleware } = require('../config/multerConfig')

const postsRouter = express.Router();
postsRouter.get('/', getPosts);
postsRouter.post('/', multerMiddleware, newPost)
postsRouter.put('/addlike', likePost )

module.exports = postsRouter;

