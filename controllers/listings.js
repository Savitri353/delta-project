const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    
    const { category, country } = req.query;

    let filter = {};

    if (category) {
        filter.category = category;
    } 
    
    if(country) {
        filter.country = country;
    } 
    
    const alllistings = await Listing.find(filter);
    return res.render("listings/index.ejs", { alllistings });

}


module.exports.renderNewform = (req, res) => {
    return res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
    // console.log(`owner: ${listing.owner._id}`);
    // console.log(`currentUser: ${res.locals.currentUser._id}`);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exists");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });


}


module.exports.createNewListing = async (req, res) => {
   

    let url = req.file.path;
    let filename = req.file.filename;

    let location = req.body.listing.location;
    // 🌍 Step 1: Use Nominatim to get coordinates from the location
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`, {
        headers: {
            'User-Agent': 'MyAppName (savitrigamit123456@gmail.com.com)' // Required by Nominatim
        }
    });

    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
        req.flash("error", "Location not found!");
        return res.redirect("/listings/new");
    }

    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);
    console.log(lat , "..", lon);

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

     // 👇 Add geometry field
     newListing.geometry = {
        type: "Point",
        coordinates: [lon, lat] // GeoJSON: [longitude, latitude]
    };

    console.log(newListing);

    await newListing.save();

    req.flash("success", "New Listing is created");
    res.redirect("/listings");
}


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let ImageUrl = listing.image.url;

    let newImageUrl = ImageUrl.replace("/upload", "/upload/w_200");


    if (!listing) {
        req.flash("error", "Listing you requested for does not exists");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing, newImageUrl });
}

module.exports.updateListing = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(404, "send valid data");
    }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing },{ new: true });
    console.log(listing);
    let location = listing.location;
    // console.log(location);
    
     // 🌍 Step 1: Use Nominatim to get coordinates from the location
     const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`, {
        headers: {
            'User-Agent': 'MyAppName (savitrigamit123456@gmail.com)' // Required by Nominatim
        }
    });

    const geoData = await geoRes.json();
    console.log(geoData);

    if (!geoData || geoData.length === 0) {
        req.flash("error", "Location not found!");
        return res.redirect("/listings/new");
    }

    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);
    console.log(lat , "..", lon);

     // 👇 Add geometry field
     listing.geometry = {
        type: "Point",
        coordinates: [lon, lat] // GeoJSON: [longitude, latitude]
    };

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
       
        await listing.save();
    }

    await listing.save();

    req.flash("success", "Listing is Updated");
    return res.redirect(`/listings/${id}`);

}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing is deleted");
    res.redirect("/listings");
}