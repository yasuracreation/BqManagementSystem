const express = require('express');
const router = express.Router();
const {Property,PropertyValidate} = require('../models/property');

router.get('/',async (req,res)=>{
    const property = await Property.find().sort('propertyName');
    if(!property) return res.status('400').send('Property information not available');
    
    res.send(property);
});

router.post('/',async (req,res)=>{
    const {error} = PropertyValidate(req.body);

    if(error) return res.status(400).send(eror.details[0].messageg);

    let property = new Property({
        propertyName:req.body.propertyName,
        address:req.body.address,
        telephone:req.body.telephone,
        mobile:req.body.mobile,
        email:req.body.email,
        status:req.body.status,
        createdDate:req.body.createdDate,
        updateDate:req.body.updateDate,
        createdUser:req.body.createdUser,
        updatedUser:req.body.updatedUser,
        propertyCode:req.body.propertyCode
    });

    property = await property.save();
    res.send(property);
});
router.put('/:id',async (req,res)=>{
    const {error}= PropertyValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const property = await Property.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!property) res.status(404).send('The Property is not found');

    res.send(property);
})
router.get('/:id',async (req,res)=>{
    let property = await Property.findById(req.params.id);

    if(!property)return res.status(400).send('Requested resources not found');
    res.send(property);
})
router.delete('/:id',async (req,res)=>{
    const response = await Property.findByIdAndRemove(req.params.id);
    if(!response)return res.status(404).send('requested resourse not found');

    res.send(response);
})
module.exports = router;
