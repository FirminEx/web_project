const Post = require('../models/postModel')
const User = require('../models/userModel')
const fs = require("fs");
const mongoose = require("mongoose");


const getPosts = async (req, res) => {
    Post.find()
    .then(async response => res.status(200).json(response))
    .catch(err => {
        res.status(404).send('Cannot find the posts')
        console.log(err.message);
    })
}

const newPost = async (req, res) => {
    let imgUpload = null;
    let path = null
    if(req.file) {
        path = __dirname + '/../' + req.file.path
        const img = fs.readFileSync(path)
        imgUpload = {
            data: img,
            type: req.file.mimetype
        }
    }
    const { userID, text  } = req.body
    if(!mongoose.isValidObjectId(userID)) return res.status(201).send('Author Id not valid')
    const user = await User.findById(userID)
        .catch(err => {
            console.log(err);
            res.status(201).send('Could not find the user')
        })
    if(!user) return res.status(201).send('Could not find the user')
    const post = {
        author: user.userName,
        authorID: userID,
        text: text,
        date: Date.now(),
        authorPicture: user.picture,
    }
    if (imgUpload) {
        //console.log(imgUpload)
        post['media'] = imgUpload
    }


    Post.create(post)
    .then(response => {
        if(imgUpload) fs.unlinkSync(path)
        return res.status(200).json(response)
    })
    .catch(err => {
        console.log(err.message)
        if(imgUpload) fs.unlinkSync(path)
        return res.status(401).send('Could not create the post')
    })
}

const likePost = async (req, res) => {
    const {userid, postid} = req.body
    if (!mongoose.isValidObjectId(userid) || !mongoose.isValidObjectId(postid)) return res.status(400).send("Invalid ID");
    Post.findByIdAndUpdate(postid, {
        $addToSet: {likers: userid},
        },
        { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(201).send(err.message))
}

const getPostsUser = async (req, res) => {
    const {userID} = req.body;
    if(!mongoose.isValidObjectId(userID)) return res.status(201).send('Incorrect user id');
    const user = await User.findById(userID);
    if(user) {
        await Post.find({authorID: user._id})
            .then(response => {
                return res.status(200).json({posts: response})
            })
            .catch(error => {
                console.log(error)
                return res.status(201).send('Could not find user posts')
            })
    }
    if(!user) return res.status(201).send('Could not find the user');
}


module.exports = { getPosts, newPost, likePost, getPostsUser }