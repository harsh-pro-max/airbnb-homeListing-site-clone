const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
    // some models like username,salting,hash, add in files passport-local-mongoose by default
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);

