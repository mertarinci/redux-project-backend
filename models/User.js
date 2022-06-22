const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);



const Schema = mongoose.Schema;

const UserSchema = new Schema({

    userId:Number,

    email:{
        type:String,
        required:[true,"Please provide an email."],
        unique:true
    },
    username:{
        type:String,
        required:[true,"Please provide an username."],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password."],
        select:false,
        minlength:[6,"Please provide a password longer than 6 characters."]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    profileImage:{
        type:String,
        default:"https://picsum.photos/300/300"
    }

})



UserSchema.plugin(AutoIncrement, {id: 'id_counter', inc_field: 'userId'});

module.exports = mongoose.model("User",UserSchema)