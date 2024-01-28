import Joi from "joi";

function infoValidate(info) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone1: Joi.string().required(),
    phone2: Joi.string(),
    telephone: Joi.string(),

    webSiteUrl: Joi.string(),
  });

  return schema.validate(info);
}

export { infoValidate };
