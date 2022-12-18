import Joi from "joi";

const schemaOrders = Joi.array()
  .items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      picture: Joi.string().required(),
      price: Joi.number().required().greater(0),
      oldprice: Joi.number().required().greater(0),
      count: Joi.number().required().greater(0),
    })
  )
  .required()
  .min(1);

export const schemaWebAppData = Joi.object({
  data: Joi.object({
    cart: Joi.object({
      orders: schemaOrders,
      total: Joi.number().required().greater(0),
    }).required(),
    user: Joi.object({
      name: Joi.string().required(),
      phoneNumber: Joi.string().required(),
    }).required(),
  }).required(),
  queryId: Joi.string().required(),
});
