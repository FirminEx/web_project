const express = require('express');
const { getPosts, newPost, likePost, getPostsUser, getPostsId } = require('../controller/postsControllers')
const { multerMiddleware } = require('../config/multerConfig')

const postsRouter = express.Router();
postsRouter.get('/', getPosts);
postsRouter.post('/', multerMiddleware, newPost)
postsRouter.put('/addlike', likePost )
postsRouter.post('/getPostsUser', getPostsUser)
postsRouter.post('/getPostsId', getPostsId)

module.exports = postsRouter;

