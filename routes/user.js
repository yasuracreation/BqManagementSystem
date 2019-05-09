const express = require('express');
const router = express.Router();
const {User,UserValidate} = require('../models/user');

router.get('/',async (req,res)=>{
    const user = await User.find().sort('userName');
    if(!user) return res.status('400').send('User information not available');
    
    res.send(user);
});

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
router.put('/:id',async (req,res)=>{
    const {error}= UserValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!user) res.status(404).send('The User is not found');

    res.send(user);
})
router.get('/:id',async (req,res)=>{
    let user = await User.findById(req.params.id);

    if(!user)return res.status(400).send('Requested resources not found');
    res.send(user);
})
router.delete('/:id',async (req,res)=>{
    const response = await User.findByIdAndRemove(req.params.id);
    if(!response)return res.status(404).send('requested resourse not found');

    res.send(response);
})
module.exports = router;
