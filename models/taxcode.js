const Joi = require('joi');
const mongoose = require('mongoose');

const taxcodeModel = mongoose.model('TaxCode', new mongoose.Schema({
    taxId: { type: Number },
    taxAmount:{type:Number},
    status:Number,
    updateUser:Number,
    createdUser:Number
}))
// const PropertyModel = mongoose.model('property',PropertySchema);

//validation
function validateTaxCode(taxcodeModel) {
    const schema = {
      taxId: Joi.number().required(),
      taxAmount:Joi.number().min(0).max(100),
      status:Joi.number(),
      createdDate:Joi.date(),
      updatedDate:Joi.date(),
      updateUser:Joi.number(),
      createdUser:Joi.number(),
    };
  
    return Joi.validate(taxcodeModel, schema);
  }


exports.TaxCode = taxcodeModel;
exports.TaxCodeValidate = validateTaxCode;

