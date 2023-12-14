import Joi from "joi";

function validateTestimonial(testimonial) {
    const schema = Joi.object({
        name: Joi.string().required().label('Name'),
        rating: Joi.number().required().label('Rating'),
        description: Joi.string().required().label('Description'),
        location: Joi.string().required().label('Location'),
        image: Joi.string()
    })

    return schema.validate(testimonial)
}

export default validateTestimonial