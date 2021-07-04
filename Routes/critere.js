const express = require('express');
const router = express.Router();
const CritereCtrl = require('../Services/critere');

router.post('/crit', CritereCtrl.ajout_critere);
router.post('/affect_auth', CritereCtrl.affectation_auth);


router.post('/affect_auth_demand', CritereCtrl.affectation_auth_demand);


router.get('/afficher', CritereCtrl.afficher);
router.post('/affect_manuel', CritereCtrl.affect_manuel);


module.exports = router;