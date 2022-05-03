const express = require('express')
const { getUsers, newUser, userLogIn, subscribe, addPost} = require("../controller/usersControllers");

const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.post('/logIn', userLogIn)
usersRouter.post('/subscribe', subscribe)
usersRouter.post('/', newUser)
usersRouter.post('/addPost', addPost)

module.exports = usersRouter