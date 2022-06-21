const mongoose = require("mongoose");



const Schema = mongoose.Schema;


const PostsSchema = new Schema({

    title:{
        type: String,
        required: [true,"Please provide a title."],
        unique:true
    },
    content:{
        type: String,
        required: [true,"Please provide a content."]
    },
    postImage : {
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Posts",PostsSchema)





