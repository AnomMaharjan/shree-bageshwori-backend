import Joi from "joi";

function bannerValidate(banner) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.any(),
  });

  return schema.validate(banner);
}

export { bannerValidate };
