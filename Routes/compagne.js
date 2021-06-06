const express = require('express');
const router = express.Router();
const compagneCtrl = require('../Services/compagne');

router.post('/ajouter', compagneCtrl.ajouter_quota);

router.post('/modifier', compagneCtrl.modifier_quota);

router.get('/afficher',compagneCtrl.afficher);

router.delete('/delete',compagneCtrl.supprimer_quota);


module.exports = router;