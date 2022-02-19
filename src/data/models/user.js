const mongo = require("mongoose");

const Schema = mongo.Schema;

const userSchema = new Schema ({
    user_id:{
        type: String,
        required: [true, 'UserID is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    gender:{
        type: String,
        required: [true, 'gender is required']
    },
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    surname:{
        type: String,
        required: [false]
    },
    country:{
        type: String,
        required: [false]
    },
    dob:{
        type: String,
        required: [false]
    },
    numFollowers: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongo.model('user', userSchema);

module.exports = User;