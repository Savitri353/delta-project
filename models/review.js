const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment:String,
    rating: {
        type:Number,
        min:1,
        max:5
    },
    createdAt: {
        type:Date,
        default:Date.now()
    },

    author: {
        type:Schema.Types.ObjectId, 
        ref:"User", //name of model
    }
});

module.exports = mongoose.model("Review", reviewSchema);
//so listing 
//inside review
//inside author refering User