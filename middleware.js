const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError");
const { listingSchema } = require("./schema.js"); 
const {reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next)=> {
    
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=> {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
}

module.exports.isOwner = async (req,res,next)=> { 
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`); 
    }

    next();
}

module.exports.isreviewAuthor = async (req,res,next)=> { 
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    // console.log(review.author._id);
    // console.log(res.locals.currentUser._id);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`); 
    }

    next();
}

//middleware validate functions(joi) hopscotch.. server side error handling  .. validating schema
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateReview = (req,res,next)=> {
    let {error} = reviewSchema.validate(req.body); //this function returns an object which contains the error key.. that at which field error is. means fieid validation fail.

    if(error) {
        let errMsg = error.details.map((el)=>el.message).join(",");//printing only error message.. removing other key words like "validationError:" 
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}