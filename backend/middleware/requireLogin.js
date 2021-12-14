const mongoose = require('mongoose')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization)
    {
        return res.status(401).json({ error: "you must be logged in" })
    }
    
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, config.get('JSONTOKEN'), (err, payload) => {
        if (err)
        {
            return res.status(401).json({ error: "you must be logged in" })
        }

        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })


    })
}











// module.exports = (req, res, next) => {
//     const { authorization } = req.headers
//     if (!authorization)
//     {
//         return res.status(401).json({ error: "you must be login " })
//     }

//     // else 
//     // {


//     const token = authorization.replace("Bearer", "")
//     jwt.verify(token, config.get('JSONTOKEN'), (err, payload) => {

//         if (err)
//         {
//             return res.status(401).json({ error: "you must be login " })
//         }

//         // else 
//         // {
//         const { _id } = payload
//         User.findById(_id).then(userData => {

//             req.user = userData
//             next()

//         })
//         // }
//     })



//     // }
// }






