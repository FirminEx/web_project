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
    const { userName, mail, phone, place, date, bio, visibility } = req.body;
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
        date: Date(date),
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

module.exports = { getUsers, newUser }