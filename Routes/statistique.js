const express = require('express');
const router = express.Router();
const StatistiqueCtrl = require('../Services/statistique');


router.get('/statistique1', StatistiqueCtrl.get_genre);

router.get('/statistique2', StatistiqueCtrl.stat_dossier);

router.get('/statistique3', StatistiqueCtrl.Age);

router.get('/statistique4', StatistiqueCtrl.situation_familiale);

router.get('/statistique5', StatistiqueCtrl.grade);


module.exports = router;