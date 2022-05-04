const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require('express');
const postsRouter = require('./routes/postsRoutes')
const usersRooter = require('./routes/usersRoutes')
const connectDB = require("./config/db");
const conversationRouter = require("./routes/conversationRoutes");
const messageRouter = require("./routes/messageRoutes");
const port = process.env.PORT || 5000


connectDB();

const app = express();

app.use(cors({
    origin: '*',
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/posts', postsRouter);
app.use('/users', usersRooter);
app.use('/conversation', conversationRouter)
app.use('/message', messageRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})