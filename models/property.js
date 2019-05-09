const Joi = require('joi');
const mongoose = require('mongoose');

const PropertyModel = mongoose.model('Property', new mongoose.Schema({
    propertyName: { type: String, maxlength: 60, minlength: 4 },
    address:{type:String},
    telephone:{type:String,maxlength:15,minlength:10},
    mobile:{type:String,minlength:10,maxlength:15},
    email:{type:String},
    status:Number,
    createdDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()},
    updateUser:Number,
    createdUser:Number,
    propertyCode:Number
}))
// const PropertyModel = mongoose.model('property',PropertySchema);

//validation
function validateProperty(property) {
    const schema = {
      propertyName: Joi.string().min(3).max(60).required(),
      address:Joi.string().min(3).max(150),
      telephone:Joi.string().min(10).max(15),
      mobile:Joi.string().min(10).max(15),
      email:Joi.string().email(),
      status:Joi.number(),
      createdDate:Joi.date(),
      updatedDate:Joi.date(),
      updateUser:Joi.number(),
      createdUser:Joi.number(),
      propertyCode:Joi.number()
    };
  
    return Joi.validate(property, schema);
  }


exports.Property = PropertyModel;
exports.PropertyValidate = validateProperty;