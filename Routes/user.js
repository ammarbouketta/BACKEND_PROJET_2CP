const express = require('express');
const router = express.Router();
const userCtrl = require('../Services/user');

router.post('/signup', userCtrl.signup);

router.get('/afficher', userCtrl.lister);

router.get('/infos_user',userCtrl.infos_user);

router.post('/update/', userCtrl.update_info);

router.post('/update_passe_word/', userCtrl.update_mot_de_passe);

router.post('/login', userCtrl.login);

router.delete('/delete/',userCtrl.delete_user);


module.exports = router;