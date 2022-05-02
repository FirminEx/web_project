const express = require('express')
const { getUsers, newUser, userLogIn} = require("../controller/usersControllers");

const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.post('/logIn', userLogIn)
usersRouter.post('/', newUser)

module.exports = usersRouter