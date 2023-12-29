import Joi from "joi";

function validateTestimonial(testimonial) {
    const schema = Joi.object({
        name: Joi.string().required().label('name'),
        rating: Joi.number().required().label('rating'),
        review: Joi.string().required().label('review'),
        location: Joi.string().required().label('location'),
        image: Joi.string().label('image')
    })

    return schema.validate(testimonial)
}

export default validateTestimonial