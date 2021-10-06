// const config=require('./config.env')
const dotenv = require('dotenv').config({ path: "./config.env" })
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const path = require("path")
// api router
const auth = require('./routes/api/auth')
const Post = require('./routes/api/Post')
const app = express()





// postmen connection
app.use(express.json())


// mongodb connection
connectDB()



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
    app.use(express.static(path.join(__dirname, '../build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './frontend', 'build', 'index.html'))
    })

}


// PORT
const PORT = process.env.PORT || 5000


// app Running
app.listen(PORT, () => {
    console.log(`Server ${process.env.NODE_ENV} is Listening on ${PORT}`)
})