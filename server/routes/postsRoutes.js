const express = require('express');
const { getPosts, newPost, likePost, getPostsUser} = require('../controller/postsControllers')
const { multerMiddleware } = require('../config/multerConfig')

const postsRouter = express.Router();
postsRouter.get('/', getPosts);
postsRouter.post('/', multerMiddleware, newPost)
postsRouter.put('/addlike', likePost )
postsRouter.get('/getPostsUser', getPostsUser)

module.exports = postsRouter;

