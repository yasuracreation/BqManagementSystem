const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config')

const userSchema=new mongoose.Schema({
  propertyId: { type: Number },
  userName:{type:String,unique:true},
  fristName:{type:String,maxlength:60,minlength:3},
  lastName:{type:String,minlength:3,maxlength:60},
  password:{type:String},
  status:Number,
  createdDate:{type:Date,default:Date.now()},
  updatedDate:{type:Date,default:Date.now()},
  updateUser:Number,
  createdUser:Number,
  propertyCode:Number,
  isAdmin:Boolean
})
userSchema.methods.genarateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, userName: this.userName,isAdmin:this.isAdmin }, config.get('jwtPrivateKey'))
  return token;
}
const userModel = mongoose.model('User', userSchema)
// const PropertyModel = mongoose.model('property',PropertySchema);

//validation
function validateUser(userModel) {
    const schema = {
      propertyId: Joi.number().required(),
      userName:Joi.string().min(3).max(60),
      fristName:Joi.string().min(3).max(60),
      lastName:Joi.string().min(3).max(60),
      password:Joi.string(),
      status:Joi.number(),
      createdDate:Joi.date(),
      updatedDate:Joi.date(),
      updateUser:Joi.number(),
      createdUser:Joi.number(),
      propertyCode:Joi.number()
    };
  
    return Joi.validate(userModel, schema);
  }


exports.User = userModel;
exports.UserValidate = validateUser;

