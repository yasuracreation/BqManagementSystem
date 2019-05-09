const Joi = require('joi');
const mongoose = require('mongoose');

const foodTypeModel = mongoose.model('FoodType', new mongoose.Schema({
    foodTypeName: { type: String },
    status:Number,
    updateUser:Number,
    createdUser:Number,
    createdDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()},
    updateUser:Number,
    createdUser:Number,
    propertyCode:Number
}))
// const PropertyModel = mongoose.model('property',PropertySchema);

//validation
function validatefoodType(foodTypeModel) {
    const schema = {
      foodTypeName: Joi.string().required(),    
      status:Joi.number(),
      createdDate:Joi.date(),
      updatedDate:Joi.date(),
      updateUser:Joi.number(),
      createdUser:Joi.number()
    };
  
    return Joi.validate(foodTypeModel, schema);
  }


exports.FoodType = foodTypeModel;
exports.FoodTypeValidate = validatefoodType;

