import Joi from 'joi';

const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phonenumber: Joi.number().min(10).required(),
  fullname: Joi.string().required(),
});

export default userValidationSchema;
