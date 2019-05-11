
const express = require('express');
const router = express.Router();
const {User,UserValidate} = require('../models/user');


router.post('/',async (req,res)=>{
    const {error} = UserValidate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = new User({
        propertyId:req.body.propertyId,
        userName:req.body.userName,
        fristName:req.body.fristName,
        lastName:req.body.lastName,
        password:req.body.password,
        status:req.body.status,
        createdDate:req.body.createdDate,
        updateDate:req.body.updateDate,
        createdUser:req.body.createdUser,
        updatedUser:req.body.updatedUser
    });

    user = await user.save();
    res.send(user);
});