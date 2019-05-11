const _ = require('lodash');
const {User,UserValidate} = require('../models/user');
const bcrypt = require('bcrypt')
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
exports.usercreate = createUser; 