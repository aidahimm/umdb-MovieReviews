const mongo = require("mongoose");

const Schema = mongo.Schema;

const userSchema = new Schema ({
    userID:{
        type: String,
        required: [true, 'Field is required']
    },
    email:{
        type: String,
        required: [true, 'Field is required']
    },
    password:{
        type: String,
        required: [true, 'Field is required']
    },
    name:{
        type: String,
        required: [true, 'Field is required']
    },
    surname:{
        type: String,
        required: [true, 'Field is required']
    },
    country:{
        type: String,
        required: [true, 'Field is required']
    },
    dob:{
        type: String,
        required: [true, 'Field is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongo.model('user', userSchema);

module.exports = User;