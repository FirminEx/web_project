const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const Post = require("../models/postModel");
const mongoose = require("mongoose");
const fs = require("fs");

const getUsers = async (req, res) => {
    User.find()
        .then(response => {
            console.log('Sending all users');
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err.message);
            res.status(400).send('Cannot find the users');
        })
}

const newUser = async(req, res) => {
    const { userName, password, mail, phone, place, bio, visibility } = req.body;
    if(!userName || !password || !mail) return res.status(201).send('Please enter all required fields')
    const userN = await User.findOne({ userName })
    if(userN) {
        console.log(userName + ' already exists');
        return res.status(201).send('This username is taken')
    }
    const userMail = await User.findOne( { mail })
    if(userMail) {
        console.log(mail + ' is already used');
        res.status(201).send('This mail is already used')
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        userName: userName,
        password: hashPassword,
        mail: mail,
        phone: phone,
        place: place,
        date: Date.now(),
        bio: bio,
        visibility: visibility
    })
        .catch(err => {
            console.log(err)
            res.status(201).send('Could not create the status')
        })
    if(user) {
        return res.status(200).json({_id: user._id, mail: user.mail, name: user.userName})
    }
    else {
        console.log('Cannot create user', user);
        res.status(201).send('Cannot create user')
    }
}

const userLogIn = async (req, res) => {
    if(!req.body.mail || !req.body.password) {
        res.status(201).send('Please enter all the fields');
        return;
    }
    const { mail, password} = req.body
    const user = await User.findOne({mail: mail})
    if(user) {
        if(await bcrypt.compare(password, user.password)){
            return res.status(200).json({_id: user._id, mail: user.mail, userName: user.userName, friends: user.friends, friendRequests: user.friendRequests, posts: user.posts, picture: user.picture})
        }
        return res.status(201).send('Incorrect password')
    }
    res.status(201).send('Could not find the user')
}

const sendFriendRequest = async (req, res) => {
    const { id, target } = req.body;
    if(!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(target) || target === id) return res.status(201).send('Bad user id or target id (might be the same)')
    let user = await User.findById(id);
    if(!user) return res.status(201).send('could not find the user');

    const targetUser = await User.findById(target);
    if(!targetUser) return res.status(201).send('could not find the target')

    await User.findByIdAndUpdate(target, {
        $addToSet: {friendRequests: id}
    }, {new: true})
        .then(response => res.status(200).json({id: response._id , friendRequests: response.friendRequests}))
        .catch(e => {
            res.send(201).status('Could not send friend request');
            console.log(e.message);
        })
}

const addPost = async (req, res) => {
    const { id, postID } = req.body;
    if(!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(postID)) return res.status(201).send('Incorrect user or post id');
    await Post.findById(postID)
        .then(response => {
            if (!response) res.status(201).send('Post does not exist')
        })
        .catch(error => {
        console.log(error.message)
        return res.status(201).send('Could not find the post')
    })
    User.findByIdAndUpdate(id, {
        $addToSet: {posts: postID}
    }, {new: true})
        .then(response => {
            return res.status(200).json({id: response._id, posts: response.posts})
        })
        .catch(error => {
            res.status(201).send('Could not update the posts')
            console.log(error.message)
        })
}

const getUserId = async(req,res) => {
    const { id } = req.body;
    if(!mongoose.isValidObjectId(id)) return res.status(201).send('Not a valid user id')
    const user = await User.findById(id).catch(e => {
        res.status(201).send('Could not find the user')
        console.log(e)
    })
    if(!user) return res.status(201).send('Unknown user')
   res.status(200).json(user)
}

const acceptFriendRequest = async (req, res) => {
    const { id, target } = req.body;
    if(!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(target)) return res.status(201).send('Not a valid user or target id')

    const user = await User.findById(id);
    if(!user) return res.status(201).send('User not found')

    const targetUser = await User.findById(target);
    if(!targetUser) return res.status(201).send('Target user not found')

    if(!user.friendRequests.includes(target)) return res.status(201).send('Target not in user requests')

    User.findByIdAndUpdate(id, {
        $pull: {friendRequests: target},
        $addToSet: {friends: target}
        },{new: true})
        .then(userResponse => {
            User.findByIdAndUpdate(target, {
                $addToSet: {friends: id}
            }, {new: true})
                .then(targetUser => {
                    return res.status(200).json({
                        user: {
                            userName: userResponse.userName,
                            friendRequests: userResponse.friendRequests,
                            friends: userResponse.friends
                        },
                        target: {
                            userName: targetUser.userName,
                            friends: targetUser.friends
                        }})
                })
                .catch(err => {
                    console.log(err)
                    res.status(201).send('Could not update the target friend list')
                })
        })
        .catch(err => {
            console.log(err)
            res.status(201).send('Could not update user friend list or friend requests')
        })
}

const changeUsername = async (req, res) => {
    const { id, newUserName } = req.body;
    if(!mongoose.isValidObjectId(id)) return res.status(201).send('Invalid user id')
    if(!(newUserName.length > 2)) return res.status(201).send('userName must be at least 3 characters')
    const taken = await User.findOne({userName: newUserName})
    if(taken) return res.status(201).send('Username already taken')
    const user = await User.findByIdAndUpdate(id, {userName: newUserName}, {new: true})
        .catch(err => {
            console.log(err)
            return res.status(201).send('Could not update the user name')
        })
    if(!user) return res.status(201).send('Could not update the user name')
    res.status(200).json(user.userName)
}

const changePlace = async (req, res) => {
    const { id, newPlace } = req.body;
    if(!mongoose.isValidObjectId(id)) return res.status(201).send('Invalid user id')
    const user = await User.findByIdAndUpdate(id, {place: newPlace}, {new: true})
        .catch(err => {
            console.log(err)
            return res.status(201).send('Could not update the place')
        })
    if(!user) return res.status(201).send('Could not update the place')
    res.status(200).json(user.place)
}

const changeBio = async (req, res) => {
    const { id, newBio } = req.body;
    if(!mongoose.isValidObjectId(id)) return res.status(201).send('Invalid user id')
    const user = await User.findByIdAndUpdate(id, {bio: newBio}, {new: true})
        .catch(err => {
            console.log(err)
            return res.status(201).send('Could not update the bio')
        })
    if(!user) return res.status(201).send('Could not update the bio')
    res.status(200).json(user.bio)
}

const changePicture = async (req, res) => {
    const { id } = req.body;
    if(!mongoose.isValidObjectId(id)) return res.status(201).send('Invalid user id')
    let imgUpload = null;
    let path = null
    if(req.file) {
        path = __dirname + '/../' + req.file.path
        const img = fs.readFileSync(path)
        imgUpload = {
            data: img,
            type: req.file.mimetype
        }
    } else return res.status(201).send('A new profile picture is required')
    const user = await User.findByIdAndUpdate(id, {picture: imgUpload}, {new: true})
        .catch(err => {
            console.log(err)
            if(imgUpload) fs.unlinkSync(path)
            return res.status(201).send('Could not update the profile picture')
        })
    if(imgUpload) fs.unlinkSync(path)
    if(!user) return res.status(201).send('Could not update the profile picture')
    res.status(200).json(user)
}

const rejectFriendRequest = async (req, res) => {
    const {userID, target} = req.body;
    if(!mongoose.isValidObjectId(userID) || !mongoose.isValidObjectId(target)) return res.status(201).send('Invalid user or target id')
    await User.findById(userID)
        .catch(err => {
            console.log(err)
            res.status(201).send('Could not find the user')
        })
        .then(async response => {
            if(!response.friendRequests.includes(target)) res.status(201).send('User does not have target request')
            const user = await User.findByIdAndUpdate(userID, {$pull: {friendRequests: target}})
                .catch(err => {
                    console.log(err)
                    return res.status(201).send('Could not update the user')
                })
            if(user) return res.status(200).json(user)
            return res.status(201).send('Could not update the user')
        })
}

const deleteFriend = async (req, res) => {
    const {userID, target} = req.body;
    if(!mongoose.isValidObjectId(userID) || !mongoose.isValidObjectId(target)) return res.status(201).send('Invalid user or target id')
    await User.findById(userID)
        .catch(err => {
            console.log(err)
            res.status(201).send('Could not find the user')
        })
        .then(async response => {
            if(!response.friends.includes(target)) res.status(201).send('User does not have target as friend')
            const user = await User.findByIdAndUpdate(userID, {$pull: {friends: target}})
                .catch(err => {
                    console.log(err)
                    return res.status(201).send('Could not update the user')
                })
            const targetUser = await User.findByIdAndUpdate(target, {$pull: {friends: userID}})
            if(user && targetUser) return res.status(200).json(user.friends)
            return res.status(201).send('Could not update the user')
        })
}

module.exports = { getUsers, newUser, userLogIn, sendFriendRequest, addPost, getUserId, acceptFriendRequest, changeUsername, changePlace, changeBio, changePicture, rejectFriendRequest, deleteFriend }