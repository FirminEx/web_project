const express = require('express')
const { getUsers, newUser} = require("../controller/usersControllers");

const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.post('/', newUser)

module.exports = usersRouter