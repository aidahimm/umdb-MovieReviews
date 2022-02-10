const mongo = require("mongoose");

const Schema = mongo.Schema;

const adminsSchema = new Schema ({
    adminsID:{
        type: Number,
        required: [true, 'Admins Id  is required']
    },
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    dob:{
        type: String,
        required: [true, 'DOB is required']
    }, 
   
});

const Admins = mongo.model('movie', adminsSchema);
module.exports = Admins;