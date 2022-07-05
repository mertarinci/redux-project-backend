const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")



const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName:{
        type:String,
        required:[true,"Please enter your first name."]

    },
    lastName: {
        type:String,
        required:[true,"Please enter your last name."]

    },
     email:{
        type:String,
        required:[true,"Please provide an email."],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please provide a valid email."]
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
    },
    userId:{
        type:Number
    },
    role:{
        type:String,
        default:"user"
    },
    isOnline: {
        type:Boolean,
        default:false
    },
    resetPasswordToken: {
        type:String
    },
    resetPasswordExpire: {
        type:Date
    }

})

UserSchema.methods.generateJwtFromUser = function(){


    const {JWT_SECRET,JWT_EXPIRE} = process.env;

    const payload = {
        username: this.username,
        userId: this.userId,
        email : this.email,
        id:this._id,
        role:this.role,
        isOnline: this.isOnline,
        firstName: this.firstName,
        lastName: this.lastName
    };

    const token = jwt.sign({...payload},JWT_SECRET,{
        expiresIn: JWT_EXPIRE
    });

    return token;

}

UserSchema.methods.getResetToken = function(){


    const randomHexString = crypto.randomBytes(15).toString("hex")

    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex")

    this.resetPasswordToken = resetPasswordToken
    this.resetPasswordExpire = Date.now() + 300000

    return resetPasswordToken;

    }



UserSchema.plugin(AutoIncrement, {id: 'id_counter', inc_field: 'userId'});


UserSchema.pre("save", function(next){

    // Şifre değişmediğinde

    if(!this.isModified("password")){
        next();
    }else{
        bcrypt.genSalt(10, (err,salt) => {
            if(err) next(err)
    
            bcrypt.hash(this.password,salt,(err,hash) => {
                if(err) next(err)
                this.password = hash
                next();
            })
        })
    }
})

module.exports = mongoose.model("User",UserSchema)