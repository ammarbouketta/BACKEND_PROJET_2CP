const express = require('express');
const router = express.Router();
const CritereCtrl = require('../Services/critere');

router.post('/crit', CritereCtrl.ajout_critere);

module.exports = router;