if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

console.log(process.env.SECRET); 

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
.then((res)=> {
    console.log("connected to DB");
})
.catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl); //mongoose atlas
}

app.use(methodOverride("_method"));
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs", ejsMate);//for includes, layoutes
app.use(express.static(path.join(__dirname, "/public")));

const store =  MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
        secret:process.env.SECRET
    },
    touchAfter:24*3600,
});

store.on("error", ()=> {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie: {
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};
 
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); //sign in , log in
passport.serializeUser(User.serializeUser()); //stores data in temporary storage(express-session)
passport.deserializeUser(User.deserializeUser()); //remove data from the temporary storage

app.use((req,res,next)=> {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    console.log(res.locals.currentUser);
    next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.all("*", (req,res,next)=> {
    next(new ExpressError(404, "Page not found"));
})

//error handling middleware
app.use((err, req, res, next)=> {
    let {statusCode=500, message="something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("err.ejs", {err});    
});
app.listen(3000, ()=> {
    console.log("server is listening on port 3000");
});