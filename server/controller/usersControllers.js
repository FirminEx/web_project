const User = require('../models/userModel')

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
    const { userName, mail, phone, place, bio, visibility } = req.body;
    const user = await User.findOne({ userName })
    if(user) {
        console.log(userName + ' already exists');
        res.status(401).send('This username is taken')
    }
    const userMail = await User.findOne( { mail })
    if(userMail) {
        console.log(mail + ' is already used');
        res.status(401).send('This mail is already used')
    }
    User.create({
        userName: userName,
        mail: mail,
        phone: phone,
        place: place,
        date: Date.now(),
        bio: bio,
        visibility: visibility
    })
        .then(response => {
            console.log('Created user ' + response);
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('Cannot create user', err.message);
            res.status(401).send('Cannot create user, unexpected error')
        })
}

const userLogIn = async (req, res) => {
    if(!req.body.mail) {
        res.status(201).send('No mail entered');
        return;
    }
    const mail = req.body.mail
    const user = await User.findOne({mail: mail})
    if(user) {
        res.status(200).json(user)
        return
    }
    res.status(201).send('Could not find the user')
}

module.exports = { getUsers, newUser, userLogIn }