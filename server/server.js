const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require('express');
const postsRoutes = require('./routes/postsRoutes')
const connectDB = require("./config/db");
const port = process.env.PORT || 5000



connectDB();

const app = express();

app.use(cors({
    origin: '*',
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/posts', postsRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})