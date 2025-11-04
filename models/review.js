const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment : String,
    rating:{
        type : Number,
        min: 1,
        max: 5
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },

});

module.exports = mogoose.model("Review",reviewSchema);