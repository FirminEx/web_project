const User = require('../models/userModel')
const bcrypt = require("bcrypt");

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
        return res.status(400).send('This username is taken')
    }
    const userMail = await User.findOne( { mail })
    if(userMail) {
        console.log(mail + ' is already used');
        res.status(400).send('This mail is already used')
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
        res.status(401).send('Cannot create user')
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
        console.log(password)
        if(await bcrypt.compare(password, user.password)){
            return res.status(200).json({_id: user._id, mail: user.mail, userName: user.userName})
        }
        return res.status(201).send('Incorrect password')
    }
    res.status(201).send('Could not find the user')
}

module.exports = { getUsers, newUser, userLogIn }