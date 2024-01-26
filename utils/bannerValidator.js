import Joi from "joi";

function bannerValidate(banner) {
  const schema = Joi.object({
    title: Joi.string().required(),
    subTitle: Joi.string(),
    description: Joi.string(),
    image: Joi.string().label("image"),
    isLinkAttached: Joi.boolean(),
    linkUrl: Joi.string(),
    subTitleHighlights: Joi.string(),
    titleHighlights: Joi.string(),
  });

  return schema.validate(banner);
}

export { bannerValidate };
