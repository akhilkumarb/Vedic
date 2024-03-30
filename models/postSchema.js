//aquiring mongoose connection
const mongoose = require('mongoose');

//creating a schema
const postSchema = new mongoose.Schema({
   text:{
    type: String
   },
   imgUrl:{
    type: String
   }
})

//setting the collection name
const post = mongoose.model('post', postSchema);

//exporting list
module.exports = post;