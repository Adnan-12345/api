const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'author'

    },
    contactPhone:{
        type:String,
        required:true
    },
    contactType:{
        type:String,
        required:true
    },
    contactDate:{
        type:Date
    }

})
module.exports = mongoose.model('posts',PostSchema);