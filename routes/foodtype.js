const express = require('express');
const router = express.Router();
const {FoodType,FoodTypeValidate} = require('../models/foodtype');

router.get('/',async (req,res)=>{
    try{
        const foodType = await FoodType.find().sort('foodTypeName');
        if(!foodType) return res.status('400').send('foodType information not available');
        
        res.send(foodType);
    }catch(ex){
        return res.status(400).send(ex.message);
    }
   
});

router.post('/',async (req,res)=>{

    const {error} = FoodTypeValidate(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    try{
        let foodType = new FoodType({
            foodTypeName:req.body.foodTypeName,       
            status:req.body.status,
            createdDate:req.body.createdDate,
            updateDate:req.body.updateDate,
            createdUser:req.body.createdUser,
            updatedUser:req.body.updatedUser
        });
    
        foodType = await foodType.save();
        res.send(foodType);
    }catch(ex){
        return res.status(400).send(ex.message);

    }

});
router.put('/:id',async (req,res)=>{
    const {error}= FoodTypeValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const foodType = await FoodType.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!foodType) res.status(404).send('The foodType is not found');

    res.send(foodType);
})
router.get('/:id',async (req,res)=>{
    try{
        let foodType = await FoodType.findById(req.params.id);

        if(!foodType)return res.status(400).send('Requested resources not found');
        res.send(foodType);
    }catch(ex){
        return res.status(400).send(ex.message);

    }
 
})
router.delete('/:id',async (req,res)=>{
    const response = await FoodType.findByIdAndRemove(req.params.id);
    if(!response)return res.status(404).send('requested resourse not found');

    res.send(response);
})
module.exports = router;
