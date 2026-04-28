const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js"); //it is an object{data:sampllistin}

if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const dbUrl = process.env.ATLASDB_URL;

main()
.then((res)=> {
    console.log("connected to DB");
})
.catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
    initDB();
}

const initDB = async ()=> {
    // await Listing.deleteMany({});
   const updatedData = initData.data.map((obj)=> ({
        ...obj,
         owner:'69f09161fc6e8af1f9addd31'}));
    await Listing.insertMany(updatedData, { ordered: false });
    console.log("data was initialized");
   
}

