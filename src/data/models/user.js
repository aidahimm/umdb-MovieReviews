const mongo = require("mongoose");

const Schema = mongo.Schema;

const userSchema = new Schema ({
    _id:{
        type: String,
    },
    username:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    gender:{
        type: String,
    },
    name:{
        type: String,
    },
    surname:{
        type: String,
    },
    country:{
        type: String,
    },
    dob:{
        type: String,
    },
    numFollowers: {
        type: Number,
        default: 0
    },
    roles: {
        type: Array,
        default: ["User"]
    },
    joinDate: {
        type: Date,
        default: Date.now()
    }
});

const User = mongo.model('user', userSchema);

module.exports = User;