const express = require('express')
const { getUsers, newUser, userLogIn, sendFriendRequest, addPost, getUserId, acceptFriendRequest, changeUsername,
    changePlace
} = require("../controller/usersControllers");

const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.post('/logIn', userLogIn)
usersRouter.post('/sendFriendRequest', sendFriendRequest)
usersRouter.post('/', newUser)
usersRouter.post('/addPost', addPost)
usersRouter.post('/getUserId', getUserId)
usersRouter.post('/acceptFriendRequest', acceptFriendRequest)
usersRouter.post('/changeUsername', changeUsername)
usersRouter.post('/changePlace', changePlace)

module.exports = usersRouter