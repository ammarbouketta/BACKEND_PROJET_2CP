const express = require('express');
const router = express.Router();
const HistoriqueCtrl = require('../Services/historique');

router.get('/afficher', HistoriqueCtrl.afficher);

router.post('/ajouter', HistoriqueCtrl.ajouter);


module.exports = router;