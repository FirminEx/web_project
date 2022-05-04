const express = require('express')
const { getUsers, newUser, userLogIn, sendFriendRequest, addPost} = require("../controller/usersControllers");

const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.post('/logIn', userLogIn)
usersRouter.post('/sendFriendRequest', sendFriendRequest)
usersRouter.post('/', newUser)
usersRouter.post('/addPost', addPost)

module.exports = usersRouter