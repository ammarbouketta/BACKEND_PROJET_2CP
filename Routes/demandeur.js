const express = require('express');
const router = express.Router();
const demandeurCtrl = require('../Services/demandeur')
const auth = require('../tools/verifytoken');




router.get('/accuse', demandeurCtrl.accuse_recep);
router.post('/form', demandeurCtrl.form_demand);
router.get('/info', demandeurCtrl.infos_demandeur);
router.get('/all', demandeurCtrl.liste_demandeur);


module.exports = router;