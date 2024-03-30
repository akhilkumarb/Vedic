//aquiring mongoose connection
const mongoose = require('mongoose');

//creating a schema
const commentSchema = new mongoose.Schema({
    postId:{
        type: String,
    },
    userId:{
        type:String
    },
    comment:{
        type:String
    }
});

//setting the collection name
const comment = mongoose.model('comment', commentSchema);

//exporting list
module.exports = comment;