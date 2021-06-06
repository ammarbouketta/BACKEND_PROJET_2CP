const express = require('express');
const router = express.Router();
const docCtrl = require('../Services/documents_ad');

router.get('/file', docCtrl.click_file);



module.exports = router;