const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = await new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review saved");
    req.flash("success", "New Review is created");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview =  async (req, res)=> {
   
    let { id,reviewId } = req.params;
   let listing =  await Listing.findById(id).populate("reviews");
   
    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}}); 
    
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
    
}