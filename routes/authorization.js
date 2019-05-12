
const express = require('express');
const router = express.Router();
const {authontication} = require('../controllers/authorization')
router.post('/',authontication);

module.exports = router;