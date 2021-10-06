const mongoose = require('mongoose')
const User = mongoose.model('User')


exports.signup = (req, res) => {


    const { name, email, passowrd } = req.body;
    if (!name || !email || !passowrd)
    {
        res.status(422).json({ error: "plz fill the place" })
    }
    else
    {
        User.findOne( )
    }
}