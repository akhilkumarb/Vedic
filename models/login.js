//aquiring mongoose connection
const mongoose = require('mongoose');

//creating a schema
const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
         type : String,
         required : true,
         unique: true
    },
    password:{
        type : String,
        required : true
    }
})

//setting the collection name
const login = mongoose.model('login', loginSchema);

//exporting list
module.exports = login;