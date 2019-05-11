const _ = require('lodash');
const {User,UserValidate} = require('../models/user');
const bcrypt = require('bcrypt');


async function createUser (req,res){
    const {error} = UserValidate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({userName:req.body.userName})
        if(user) return res.status(400).send('User already registerd')
    

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password,salt);
        console.log(hash);
        req.body.password = hash;
    
        user = new User(_.pick(req.body,['propertyId','userName','fristName','lastname','password',
    'status']))
    //     user = new User({
    //     propertyId:req.body.propertyId,
    //     userName:req.body.userName,
    //     fristName:req.body.fristName,
    //     lastName:req.body.lastName,
    //     password:req.body.password,
    //     status:req.body.status,
    //     createdDate:req.body.createdDate,
    //     updateDate:req.body.updateDate,
    //     createdUser:req.body.createdUser,
    //     updatedUser:req.body.updatedUser
    // });

    user = await user.save();
    
    res.send(_.pick(user,['_id','userName','propertyId']));
}

async function update(req,res){
    const {error}= UserValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!user) res.status(404).send('The User is not found');

    res.send(user);
}

async function getbyId (req,res){
    let user = await User.findById(req.params.id);

    if(!user)return res.status(400).send('Requested resources not found');
    res.send(user);
}
async function get (req,res){
    const user = await User.find().sort('userName');
    if(!user) return res.status('400').send('User information not available');
    
    res.send(user);
}
async function deleteuser(req,res){
    const response = await User.findByIdAndRemove(req.params.id);
    if(!response)return res.status(404).send('requested resourse not found');

    res.send(response);
}
exports.usercreate = createUser; 
exports.userupdate = update;
exports.userGetId = getbyId;
exports.userget = get;
exports.deleteuser = deleteuser;