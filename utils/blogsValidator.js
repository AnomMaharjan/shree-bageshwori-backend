import Joi from "joi";

function validateBlog(blog) {
  const schema = Joi.object({
    title: Joi.string().required().label("title"),
    content: Joi.string().required().label("content"),
    image: Joi.array().items(Joi.string()),
  });
  return schema.validate(blog);
}

export default validateBlog;
