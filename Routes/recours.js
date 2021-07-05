const express = require('express');
const router = express.Router();
const RecoursCtrl = require('../Services/recours');

router.post('/accuse', RecoursCtrl.accuse);

router.post('/ajout_recours', RecoursCtrl.ajout_recours);

router.get('/afficher', RecoursCtrl.afficher);

module.exports = router;