const Joi = require('joi');
const mongoose = require('mongoose');

const bqTaskModel = mongoose.model('BqTask', new mongoose.Schema({
    reservationBqId: { type: Number },
    taskId:{type:Number},
    taskName:{type:String},
    discription:{type:String},
    status:Number,
    createdDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()},
    updateUser:Number,
    createdUser:Number
}))
// const PropertyModel = mongoose.model('property',PropertySchema);

//validation
function validateBqTask(bqTaskModel) {
    const schema = {
      reservationBqId: Joi.number().required(),
      taskId:Joi.number(),
      taskName:Joi.string(),
      discription:Joi.string(),
      status:Joi.number(),
      createdDate:Joi.date(),
      updatedDate:Joi.date(),
      updateUser:Joi.number(),
      createdUser:Joi.number(),
    };
  
    return Joi.validate(bqTaskModel, schema);
  }


exports.BanquatTask = bqTaskModel;
exports.BanquatTaskValidate = validateBqTask;

