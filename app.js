const mongoose = require('mongoose');
const express = require('express');
const config = require('config')
require('express-async-errors')

//models
const property = require('./routes/property')
const user = require('./routes/user')
const food = require('./routes/food')
const tax = require('./routes/tax')
const taxcode = require('./routes/taxcode')
const foodType = require('./routes/foodtype')
const auth = require('./routes/authorization');
const error = require('./middleware/error');
const asyncMiddleWare =  require('./middleware/async')
//connect mongodb
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR:jwtPrivateKey not defined.');
    process.exit(1);

}
mongoose.connect('mongodb://localhost/banquatsys')
    .then(()=>console.log('connectionsuccess'))
    .catch(()=>console.log('connectionfail'))


const app = express();
app.use(express.json());

//routes
app.use('/api/properties',asyncMiddleWare(property));
app.use('/api/user',asyncMiddleWare(user));
app.use('/api/food',food);
app.use('/api/tax',tax);
app.use('/api/taxcode',taxcode);
app.use('/api/foodtype',foodType);
app.use('/api/auth',asyncMiddleWare(auth));
app.use(error);


const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening on port ${port}....`))
