const express = require('express')
const mongoose = require('mongoose')
// const User = mongoose.model("User")
const User = require('../../models/User')

// config
const config = require('config')

// jwt
const jwt = require('jsonwebtoken')

// requirelogin middleware
const requireLogin = require('../../middleware/requireLogin')

// const gravatar = require('gravatar')
const toonavatar = require('cartoon-avatar');

// hashing password
const bcrypt = require('bcrypt');

const router = express.Router()


// protected routes
router.get('/', requireLogin, (req, res) => {
    res.send('hello user');
})


router.get('/joshua', (req, res) => {

    res.send('joshau');
});


router.post('/signup', (req, res) => {

    const { name, email, password, gender } = req.body
    if (!name || !email || !password || !gender)
    {
        res.status(422).json({ error: "please fill all required fields" })
    }


    User.findOne({ email: email })
        .then((savedUser) => {

            if (savedUser)
            {
                return res.status(422).json({ error: "User Email already exist. please  try with another Email" })
            }
            else
            {

                const avatar = toonavatar.generate_avatar(email, { "gender": "male", }, {
                    s: "200",
                    r: "pg",
                    d: "mm",


                    // "gender": "male"

                })

                bcrypt.hash(password, 12)
                    .then(passwordHashing => {
                        const user = new User({
                            email,
                            name,
                            password: passwordHashing,
                            gender,
                            avatar,

                        })
                        user.save()
                            .then(user => {
                                res.json({ message: "User Registration Succcessful !! " })
                            })
                    })











            }
        })


})



// signup routes
// router.post('/signup', (req, res) => {



//     const { name, email, password, gender } = req.body;
//     if (!name || !email || !password || !gender)
//     {
//         res.status(422).json({ error: "please fill all required fields" })
//     }
//     else
//     {

//         User.findOne({ email: email })
//             .then((saveUser) => {
//                 if (saveUser)
//                 {
//                     return res.status(422).json({ error: "User Email already exist. please  try with another Email" })
//                 }
//                 else
//                 {
//                     // const avatar = toonavatar.generate_avatar(options);

//                     const avatar = toonavatar.generate_avatar(email, { "gender": "male", }, {
//                         s: "200",
//                         r: "pg",
//                         d: "mm",


//                         // "gender": "male"

//                     })
//                     bcrypt.hash(password, 12)
//                         .then(hashingPassword => {

//                             const user = new User({
//                                 email,
//                                 name,
//                                 password: hashingPassword,
//                                 avatar,
//                                 gender

//                             })
//                             user.save()
//                                 .then(user => {
//                                     res.json({ message: "User Registration Succcessful !! " })
//                                 })
//                                 .catch(err)
//                             {
//                                 console.log(err);
//                             }


//                         })



//                 }
//             })

//     }
// });


// --------------------

// signin
router.post('/signin', (req, res) => {

    const { email, password } = req.body
    if (!email || !password)
    {
        res.status(422).json({ error: "please fill all required fields" })
    }
    else
    {

        User.findOne({ email: email })
            .then(savedUser => {
                if (!savedUser)
                {
                    res.status(422).json({ error: "invalid email or password" })
                }

                else
                {
                    bcrypt.compare(password, savedUser.password)
                        .then(doMatch => {
                            if (doMatch)
                            {

                                const token = jwt.sign({ _id: savedUser._id, }, config.get('JSONTOKEN'))
                                const { _id, name, email } = savedUser
                                res.send({ token: token, user: { _id, name, email } });

                                // res.json({ message: "User signin Succcessful !! " })

                            }
                            else
                            {
                                res.status(422).json({ error: "invalid email or password" })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })


    }


})




module.exports = router;

