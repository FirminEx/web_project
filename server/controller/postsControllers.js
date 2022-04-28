const Post = require('../models/postModel')


const getPosts = async (req, res) => {
    Post.find()
    .then(response => res.status(200).json(response))
    .catch(err => {
        res.status(404).send('Cannot find the posts')
        console.log(err.message);
    })
}

const newPost = async (req, res) => {
    const { author, authorID, text, date } = req.body
    Post.create({
        author: author,
        authorID: authorID,
        text: text,
        date: Date(date)
    })
    .then(response => {
        console.log('Created the post ', response)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err.message)
        res.status(401).send('Could not create the book')
    })
}

module.exports = { getPosts, newPost }