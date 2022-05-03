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
        //console.log(img)
        imgUpload = {
            data: img,
            type: req.file.mimetype
        }
    }
    const { author, authorID, text } = req.body

    if(!mongoose.isValidObjectId(authorID)) return res.status(201).send('Author Id not valid')

    const post = {
        author: author,
        authorID: authorID,
        text: text,
        date: Date.now(),
    }
    if (imgUpload) post['media'] = imgUpload
    Post.create(post)
    .then(response => {
        //console.log('Created the post ', response)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err.message)
        res.status(401).send('Could not create the post')
    })
    if(imgUpload) fs.unlinkSync(path)
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
    if(user) return res.status(200).json({posts: user.posts});
    res.status(201).send('Could not find the user');
}


module.exports = { getPosts, newPost, likePost, getPostsUser }