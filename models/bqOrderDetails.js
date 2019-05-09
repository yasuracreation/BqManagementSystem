const Joi = require('joi');
const mongoose = require('mongoose');

const bqOrderDetailModel = mongoose.model('BqOrderDetail', new mongoose.Schema({
    bqOrderDetailId:{type:Number},
    reservationBqId: { type: Number },
    foodId:{type:Number},
    quantity:{type:Number},
    remark:{type:String},
    foodCost:{type:Number},
    foodPrice:{type:Number},
    IsOriginal:{type:Boolean},
    userId:{type:Number},
    inventryTag:Number,
    status:Number,
    createdDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()},
    updateUser:Number,
    createdUser:Number
}))
// const PropertyModel = mongoose.model('property',PropertySchema);

//validation
function validateBqOrderDetail(bqOrderDetailModel) {
    const schema = {
      bqOrderDetailId:Joi.number().required(),
      reservationBqId: Joi.number().required(),
      foodId:Joi.number(),
      quantity:Joi.number(),
      remark:Joi.string(),
      foodCost:Joi.number(),
      status:Joi.number(),
      createdDate:Joi.date(),
      updatedDate:Joi.date(),
      updateUser:Joi.number(),
      createdUser:Joi.number(),
    };
  
    return Joi.validate(bqOrderDetailModel, schema);
  }


exports.BqOrderDetails = bqOrderDetailModel;
exports.BqOrderDetailValidate = validateBqOrderDetail;

