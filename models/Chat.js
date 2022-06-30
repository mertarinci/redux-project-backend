const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);



const Schema = mongoose.Schema;


const ChatSchema = new Schema({

    messageId : {
        type:Number,
    },
    message:{
        type:String,
        required:[true,"Please provide a message."]
    },
    user : {
        type:String,
        required:true,
        ref:"User"
    },
    userRole : {
        type:String,
        required:true,
        ref:"User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})




ChatSchema.plugin(AutoIncrement, {id: 'message_counter', inc_field: 'messageId'});

module.exports = mongoose.model("Chat",ChatSchema)