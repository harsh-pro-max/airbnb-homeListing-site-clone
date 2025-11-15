const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    category: Joi.string()
    .valid(
      "Trending",
      "Rooms",
      "Iconic cities",
      "Amazing Views",
      "Amazing pools",
      "Mountain",
      "Beach",
      "Lakefront",
      "Farms"
    )
    .required()
}).required()

});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});