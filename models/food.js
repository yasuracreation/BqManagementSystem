const Joi = require('joi');
const mongoose = require('mongoose');

const foodModel = mongoose.model('Food', new mongoose.Schema({
    propertyId: { type: Number },
    foodName:{type:String},
    foodCost:{type:Number},
    status:Number,
    createdDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()},
    updateUser:Number,
    createdUser:Number
}))
// const PropertyModel = mongoose.model('property',PropertySchema);

//validation
function validateFood(foodModel) {
    const schema = {
      propertyId: Joi.number().required(),
      foodName:Joi.string().min(3).max(60),
      foodCost:Joi.number(),
      status:Joi.number(),
      createdDate:Joi.date(),
      updatedDate:Joi.date(),
      updateUser:Joi.number(),
      createdUser:Joi.number(),
    };
  
    return Joi.validate(foodModel, schema);
  }


exports.Food = foodModel;
exports.FoodValidate = validateFood;

