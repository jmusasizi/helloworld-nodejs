const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const signupSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,  // Use 'String' with an uppercase 'S'
        trim: true,
        unique: true,
    },
    role:{
        type: String,
        trim:true,
    },
    branch:{
        type: String,
        trim:true,
    },
    // password:{
    //     type: String,
    //     trim:true,
    // },
});
signupSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    });

module.exports = mongoose.model('Signup', signupSchema);
