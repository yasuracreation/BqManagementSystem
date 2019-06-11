

const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
// const jwt = require('jsonwebtoken');
// const config = require('config')

async function authonticationLogin(req, res,next) {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)
              let user = await User.findOne({ userName: req.body.userName });    
        
        if (!user) return res.status(401).send('Invalid User Name or Password')
            const validpassword = await bcrypt.compare(req.body.password, user.password);
    
        if (!validpassword) return res.status(401).send('Invalid User Name or Password')
            const token = user.genarateAuthToken();
            
        res.send(token);    
    } catch (error) {
        next(error)
    }
    
}
function validate(req) {
    const schema = {
        propertyId: Joi.number().required(),
        userName: Joi.string().min(3).max(60),
        password: Joi.string()
    };
    return Joi.validate(req, schema);
}

exports.authontication = authonticationLogin;