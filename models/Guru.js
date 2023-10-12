const mongoose = require("mongoose");

const GuruSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: 1
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    experience: {
        type: Number,
        default: 0
    },
    about: {
        type: String,
        default: ""
    },
    photo: {
        type: String,
        default: ""
    },
    review: {
        type: Array
    },
    ratting: {
        type: Number,
        default: 0
    },
    peoplerated: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: "guru"
    },
    instagram: {
        type: String,
        default: null
    },
    twitter: {
        type: String
    },
    linkdin: {
        type: String
    }
},
{ timestamps: true })

const Guru = mongoose.model("Guru", GuruSchema);

module.exports = Guru;