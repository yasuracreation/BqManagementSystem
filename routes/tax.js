const express = require('express');
const router = express.Router();
const {Tax,TaxValidate} = require('../models/tax');

router.get('/',async (req,res)=>{
    const tax = await Tax.find().sort('taxName');
    if(!tax) return res.status('400').send('Tax information not available');
    
    res.send(user);
});

router.post('/',async (req,res)=>{
    const {error} = TaxValidate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let tax = new Tax({
        taxName:req.body.taxName,
        taxSum:req.body.taxSum,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        status:req.body.status,
        createdDate:req.body.createdDate,
        updateDate:req.body.updateDate,
        createdUser:req.body.createdUser,
        updatedUser:req.body.updatedUser
    });

    tax = await tax.save();
    res.send(tax);
});
router.put('/:id',async (req,res)=>{
    const {error}= TaxValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const tax = await Tax.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!tax) res.status(404).send('The tax is not found');

    res.send(tax);
})
router.get('/:id',async (req,res)=>{
    let taz = await Tax.findById(req.params.id);

    if(!tax)return res.status(400).send('Requested resources not found');
    res.send(tax);
})
router.delete('/:id',async (req,res)=>{
    const response = await Food.findByIdAndRemove(req.params.id);
    if(!response)return res.status(404).send('requested resourse not found');

    res.send(response);
})
module.exports = router;
