const Joi = require("joi");
const review = require("./models/review");

module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().allow("", null),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        category:Joi.string().required()
    }).required()
})
//server side
//to apply validation on individual field of schema : server side error handling
//actually we can do it without using joi but applying custome error handling on every single field is not nice way
//so joi does it. it throws error by itself
//** we are using joi through validatelisting function..same for review 

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})