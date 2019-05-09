const Joi = require('joi');
const mongoose = require('mongoose');

const taxModel = mongoose.model('Tax', new mongoose.Schema({
    taxName:{type:String},
    taxSum:{type:Number},
    status:Number,
    createdDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()},
    startDate:Date,
    endDate:Date,
    updateUser:Number,
    createdUser:Number
}))
// const PropertyModel = mongoose.model('property',PropertySchema);

//validation
function validateTax(taxModel) {
    const schema = {     
      taxName:Joi.string().min(3).max(60),
      taxSum:Joi.number(),
      startDate:Joi.date(),
      endDate:Joi.date(),
      status:Joi.number(),
      createdDate:Joi.date(),
      updatedDate:Joi.date(),
      updateUser:Joi.number(),
      createdUser:Joi.number(),
    };
  
    return Joi.validate(taxModel, schema);
  }


exports.Tax = taxModel;
exports.TaxValidate = validateTax;

