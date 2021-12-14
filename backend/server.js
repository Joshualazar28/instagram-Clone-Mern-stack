// const conf ig=require('./config.env')
// const dotenv = require('dotenv').config({ path: "./config.env" })
const express = require('express')
const mongoose = require('mongoose')
// const connectDB = require('./config/db')
// const path = require("path")
// api router
const auth = require('./routes/api/auth')
const Post = require('./routes/api/Post')
const app = express()



mongoose.connect('mongodb+srv://joshua:joshua123@cluster0.j0ess.mongodb.net/Blog?retryWrites=true&w=majority').then(() => {
    console.log('connection db')
})



// postmen conn ection
app.use(express.json())


// mongodb connection
// connectDB()



// user model 
require('./models/User')
require('./models/Post')



// Defin Routes
app.use('/api/blog', auth)
app.use('/api/blog', Post)

// ..............

// const __dirname =path.resolve()

if (process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, 'frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './frontend', 'build', 'index.html'))
    })

}


// PORT
const PORT = 8080


// app Running
app.listen(PORT, () => {
    console.log(`Server  is Listening on ${PORT}`)
})