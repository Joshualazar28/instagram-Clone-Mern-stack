

const mongoose = require('mongoose')



const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
    Other: 'other',
});




const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {

        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: Object.values(Genders),
    },
    date: {
        type: Date,
        default: new Date()
    }

})

module.exports = User = mongoose.model("User", userSchema)