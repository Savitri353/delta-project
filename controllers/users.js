const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup");
}

module.exports.signUp = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        let newUser = new User({ email, username});
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=> {
            if(err) {
                return next(err);
            }

            req.flash("success", "welcome to waderlust");
            return res.redirect("/listings");
        });
       
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = (req, res) => {
    req.flash("success", "welcome back to wandrerlust !");
    if(!res.locals.redirectUrl) {
        return res.redirect("/listings");
    }
   return res.redirect(res.locals.redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logOut((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    })
}