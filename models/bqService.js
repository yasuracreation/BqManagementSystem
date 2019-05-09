const Joi = require('joi');
const mongoose = require('mongoose');

const bqServiceModel = mongoose.model('BqService', new mongoose.Schema({
    serviceId:{type:Number,required},
    reservationBqId: { type: Number },
    serviceName:{type:String},
    resId:{type:Number},
    price:{type:Number},
    status:Number,
    createdDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()},
    updateUser:Number,
    createdUser:Number
}))
// const PropertyModel = mongoose.model('property',PropertySchema);

//validation
function validateBqService(bqService) {
    const schema = {
        serviceId: Joi.number().required(),
        reservationBqId:Joi.number(),
        serviceName:Joi.string(),
        resId:Joi.number(),
        status:Joi.number(),
        createdDate:Joi.date(),
        updatedDate:Joi.date(),
        updateUser:Joi.number(),
        createdUser:Joi.number(),
    };
  
    return Joi.validate(bqService, schema);
  }


exports.BqService = bqServiceModel;
exports.BqServiceValidate = validateBqService;

