const express = require('express');
const router = express.Router();
const {TaxCode,TaxCodeValidate} = require('../models/taxcode');

router.get('/',async (req,res)=>{
    const taxCode = await TaxCode.find().sort('taxId');
    if(!taxCode) return res.status('400').send('TaxCode information not available');
    
    res.send(taxCode);
});

router.post('/',async (req,res)=>{
    const {error} = TaxCodeValidate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let taxcode = new TaxCode({
        taxId:req.body.taxId,
        taxAmount:req.body.taxAmount,
        status:req.body.status,
        createdDate:req.body.createdDate,
        updateDate:req.body.updateDate,
        createdUser:req.body.createdUser,
        updatedUser:req.body.updatedUser
    });

    taxcode = await taxcode.save();
    res.send(taxcode);
});
router.put('/:id',async (req,res)=>{
    const {error}= TaxCodeValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const taxcode = await TaxCode.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!taxcode) res.status(404).send('The taxcode is not found');

    res.send(taxcode);
})
router.get('/:id',async (req,res)=>{
    let taxcode = await TaxCode.findById(req.params.id);

    if(!taxcode)return res.status(400).send('Requested resources not found');
    res.send(taxcode);
})
router.delete('/:id',async (req,res)=>{
    const response = await TaxCode.findByIdAndRemove(req.params.id);
    if(!response)return res.status(404).send('requested resourse not found');

    res.send(response);
})
module.exports = router;
