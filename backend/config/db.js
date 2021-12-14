
const mongoose = require('mongoose')
const config = require('config')
const db = config.get('MONGOURL')
// const MONGOURL = process.env.MONGOURL

const connectDB = async () => {

    try
    {
        await mongoose.connect(db)
        console.log('mongooseDB connection successfull');
    }
    catch (err)
    {
        console.log(err.message);
    }

}

module.exports = connectDB