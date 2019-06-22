const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { usercreate,userupdate,userGetId,userget,deleteuser,myprofile} = require('../controllers/user')


router.get('/',auth ,userget);
router.post('/',usercreate);
router.put('/:id',auth,userupdate)
router.get('/:id',auth,userGetId)
router.get('/me',auth,myprofile)
router.delete('/:id',[auth,admin],deleteuser)
module.exports = router;
