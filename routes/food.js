const express = require('express');
const router = express.Router();
const {Food,FoodValidate} = require('../models/food');

router.get('/',async (req,res)=>{
    const food = await Food.find().sort('foodName');
    if(!food) return res.status('400').send('Food information not available');
    
    res.send(food);
});

router.post('/',async (req,res)=>{
    const {error} = FoodValidate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let food = new Food({
        propertyId:req.body.propertyId,
        foodName:req.body.foodName,
        foodCost:req.body.foodCost,
        status:req.body.status,
        createdDate:req.body.createdDate,
        updateDate:req.body.updateDate,
        createdUser:req.body.createdUser,
        updatedUser:req.body.updatedUser
    });

    try{ 
        food = await food.save();
        res.send(food);
    }catch(ex){
        res.status(500)
        .send('Exeption while saving food, food havent created successfully '+ex.message);


    }
    
});
router.put('/:id',async (req,res)=>{
    const {error}= FoodValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const food = await Food.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!food) res.status(404).send('The food is not found');

    res.send(food);
})
router.get('/:id',async (req,res)=>{
    let food = await Food.findById(req.params.id);

    if(!food)return res.status(400).send('Requested resources not found');
    res.send(food);
})
router.delete('/:id',async (req,res)=>{
    const response = await Food.findByIdAndRemove(req.params.id);
    if(!response)return res.status(404).send('requested resourse not found');

    res.send(response);
})
module.exports = router;
