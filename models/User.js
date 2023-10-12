const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: 1
    },
    name: {
        type: String,
    },
    password: {
        type: String,      
        required: true,
    },
    email: { 
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "seeker"
    },  
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
)

const User = mongoose.model("User", UserSchema);

module.exports = User;