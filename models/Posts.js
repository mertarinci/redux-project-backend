const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);



const Schema = mongoose.Schema;


const PostsSchema = new Schema({

    _id:Number,
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
    },
    user: {
        type: Number,
        required:true,
        ref:"User"

    }
},{_id:false}
)

PostsSchema.plugin(AutoIncrement);





module.exports = mongoose.model("Posts",PostsSchema)





