const express = require('express');
const router = express.Router();
const DemandeurCtrl = require('../Services/demandeur');

router.get('/docx', DemandeurCtrl.etat_actual_demand);

router.post('/valide', DemandeurCtrl.valider);

router.delete('/delete', DemandeurCtrl.delete);

router.post('/afficher', DemandeurCtrl.afficher);

router.get("/classement", DemandeurCtrl.classement);

router.get("/classement/pdf", DemandeurCtrl.classement_pdf);

router.get('/accuse', DemandeurCtrl.accuse_recep);

router.post('/form', DemandeurCtrl.form_demand);

router.get('/info', DemandeurCtrl.infos_demandeur);

router.get('/all', DemandeurCtrl.liste_demandeur);
router.get('/allV', DemandeurCtrl.liste_demandeurv);

router.post('/modif_demand',DemandeurCtrl.update_demandeur);

router.get('/test',DemandeurCtrl.test);

module.exports = router;

// {/* <label for="nbrenfant">Nombre d’enfants</label>
//           </v-col>
//           <v-col cols="12" 
//                md="5">
//            <div class="information"> {{nbrenfant}} </div>
//            </v-col>
//           <v-col  cols="12" 
//           md="6"></v-col> */}