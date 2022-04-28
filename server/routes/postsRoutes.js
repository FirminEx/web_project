const express = require('express');
const { getPosts, newPost} = require('../controller/postsControllers')

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', newPost);

module.exports = postsRouter;

