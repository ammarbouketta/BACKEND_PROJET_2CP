const express = require('express');
const router = express.Router();
const userCtrl = require('../Services/user');
const auth = require('../tools/verifyToken')

router.post('/signup',auth, userCtrl.signup);

router.get('/afficher',auth, userCtrl.lister);

router.get('/infos_user',userCtrl.infos_user);

router.get('/infos_user2',userCtrl.infos_user2);

router.post('/update', userCtrl.update_info);

router.post('/update_passe_word/', userCtrl.update_mot_de_passe);

router.post('/login', userCtrl.login);

router.delete('/delete',auth, userCtrl.delete_user);


module.exports = router;