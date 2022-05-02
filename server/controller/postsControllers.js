const Post = require('../models/postModel')
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
    if(req.file) {
        const img = fs.readFileSync(__dirname + '/../' + req.file.path)
        console.log(img)
        imgUpload = {
            data: img,
            type: req.file.mimetype
        }
    }
    const { author, authorID, text } = req.body
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
}

const likePost = async (res, req) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("ID invalid : " + req.params.id);
    Post.findByIdAndUpdate(res.params.id, {
        $addToSet: {likers: req.body.id},
        },
        { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(201).send(err.message))
}

module.exports = { getPosts, newPost, likePost }