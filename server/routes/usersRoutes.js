const express = require('express')
const { getUsers, newUser, userLogIn, sendFriendRequest, addPost, getUserId, acceptFriendRequest, changeUsername,
    changePlace, changeBio, changePicture, rejectFriendRequest, deleteFriend, findUsersLike
} = require("../controller/usersControllers");
const {multerMiddleware} = require("../config/multerConfig");

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
usersRouter.post('/changeBio', changeBio)
usersRouter.post('/changePicture', multerMiddleware, changePicture)
usersRouter.post('/rejectFriendRequest', rejectFriendRequest)
usersRouter.post('/deleteFriend', deleteFriend)
usersRouter.post('/findUsersLike', findUsersLike)



module.exports = usersRouter