const express = require('express');
const router = express.Router();

const { usercreate,userupdate,userGetId,userget,deleteuser } = require('../controllers/user')


router.get('/',userget);
router.post('/',usercreate);
router.put('/:id',userupdate)
router.get('/:id',userGetId)
router.delete('/:id',deleteuser)
module.exports = router;
