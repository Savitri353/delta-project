const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const {storage} = require("../cloudConfig.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const upload = multer({ storage});

//index route
//creating new in db
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,  upload.single('listing[image]'),validateListing, wrapAsync(listingController.createNewListing));

//new
router.get("/new", isLoggedIn, listingController.renderNewform);

//show route
//update
//delete
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//edit 
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;