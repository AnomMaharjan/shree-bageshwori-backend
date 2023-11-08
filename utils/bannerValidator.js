import Joi from "joi";

function bannerValidate(banner) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string(),
        imageUrl: Joi.string().required()
    })

    return schema.validate(banner)
}

export { bannerValidate }