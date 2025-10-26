const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    // Default image URL when nothing provided
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=60",
    // Empty-string ko default me convert kare
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=60"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type : Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
});

listingSchema.post("findOneAndDelete",async (listing)=>{
  if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
