const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
    , role: {
        type: Number,
        default: 0
    },
    contact: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    pin: {
        type: String,
    },
    Itemproduced: {
        type: Number,
        default: 0
    }
}, { timeStamps: true });


const users = mongoose.model('user', userSchema);

//exporting users
module.exports = users;