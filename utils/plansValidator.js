import Joi from "joi";

function validatePlan(plan) {
    const schema = Joi.object({
        title: Joi.string().required(),
        subtitle: Joi.string().required(),
        price: Joi.number().required(),
        offers: Joi.array().required(),
        type: Joi.string().required().valid('Month', 'Year'),
        isPopular: Joi.boolean().default(false)
    })

    return schema.validate(plan)
}


function validateUpdatePlan(plan) {

}

export { validatePlan }