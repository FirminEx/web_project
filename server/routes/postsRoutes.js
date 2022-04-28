const express = require('express');
const { getPosts, newPost} = require('../controller/postsControllers')

const postsRooter = express.Router();

postsRooter.get('/', getPosts);
postsRooter.post('/', newPost);

module.exports = postsRooter;

