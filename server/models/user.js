const {createHmac, randomBytes}  = require('crypto')
const {createTokenForUser} = require('../services/authentication')

// const {schema, Schema, model} = require('mongoose');
const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        // unique: true
    },
    salt:{
        type: String,
        // required: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImageURL:{
        type: String,
        default: "/images/default.png",
    },
    role:{
        type: String,
        enum: ["USER","ADMIN"], // can't assign value eccept these two
        default: "USER"
    }
}, {timestamps:true});

userSchema.pre("save",function (next){  // Can't use arrow function here...
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashePassword = createHmac('sha256',salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashePassword;

    next();
})

userSchema.static("matchPasswordAndGenerateToken", async function(email, password){
    
    const user = await this.findOne({email});
    if (!user) throw new Error("User not found!");
    
    const salt = user.salt;
    const hashedPassword = user.password;
    
    const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
    
    // console.log(user);
    if(hashedPassword !== userProvidedHash) 
        throw new Error('Incorrect Password'); 
    
    const token = createTokenForUser(user);
        return token;
        // return user;
        // return {...user._doc, password: undefined, salt: undefined};
        // return hashedPassword === userProvidedHash;

})

const User = mongoose.model('user',userSchema);  

module.exports = User;
