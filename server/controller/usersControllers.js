const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const Post = require("../models/postModel");
const mongoose = require("mongoose");

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
    const {id} = req.body;
    if(!mongoose.isValidObjectId(id)) return res.status(201).send('Not a valid user id')
    const user = await User.findById(id).catch(e => {
        res.status(201).send('Could not find the user')
        console.log(e)
    })
    if(!user) return res.status(201).send('Unknown user')
   res.status(200).json(user)
}


module.exports = { getUsers, newUser, userLogIn, sendFriendRequest, addPost, getUserId }