var compagne = require('../Models/compagne').Compagne_db;
var ecrire = require('../Models/compagne').ecrire;
const { ajouter } = require('./historique');

/**Afficher les information d'une quota !! */
exports.afficher = (req, res,next) => {
    res.json(compagne().get());
/**c'est pour sauvegarder cette action  dans le fichier historique  */
                          var email="test3@esi.dz";
                          var donnee="Affichage d'une quota. "
                          ajouter(email,donnee);
    next();
}

    /**ajouter une nouvelle quota par l'administrateur */
exports.ajouter_quota = (req,res,next) => {
    /**compagen.insert c'est pour insérer dans le fichier compagne */
   compagne.insert({
       "ID_quota":compagne().get().length,//sinon on fait l'année de quota
       "nombre_quota":req.body.nombre_quota||"",
       "date_debut":req.body.date_debut||"",
       "date_fin":req.body.date_fin||"",

   });
   ecrire();
                          var email="test3@esi.dz";
                          var donnee="Ajout d'une nouvelle quota. "
                          ajouter(email,donnee);
   res.status(200).json({ message: 'Quota ajouter !' });
}
/**c'est pour supprimer toutes les informations d'une quota  */
exports.supprimer_quota = (req,res,next) => {
    /**si quota existe  */
    if (compagne({ "ID_quota": req.body.ID_quota }).get().length === 1) 
    {
        try
         {
            const comp = compagne({ "ID_quota": req.body.ID_quota }).remove();/**fonction qui permet de supprimer un objet */
                          var email="test3@esi.dz";
                          var donnee="Suppression d'une quota. "
                          ajouter(email,donnee);
            res.status(200).json({ message: 'Quota supprimé !' })
         } catch (error) { res.status(400).json({ error }) };
    } else
        {
             res.json({"Error": "quotta n'existe pas " });
        }
    ecrire();
    next();
}


 exports.modifier_quota = (req,res,next) => {
    /**si quota existe  */
    if (compagne({ "ID_quota": req.body.ID_quota }).get().length === 1)
     {
         /**update c'est une fonction qui permet de modifier les champs d'une quota  */
            const comp = compagne({ "ID_quota": req.body.ID_quota }).update({
                    "nombre_quota":req.body.nombre_quota||compagne({ "ID_quota": req.body.ID_quota }).select("nombre_quota")[0],
                    "date_debut": req.body.date_debut||compagne({ "ID_quota": req.body.ID_quota }).select("date_debut")[0],
                    "date_fin": req.body.date_fin||compagne({ "ID_quota": req.body.ID_quota }).select("date_fin")[0],
                }, true);
            ecrire();/**pour sauvegarder lesmodifications dans lesfichier compagne  */

                          var email="test3@esi.dz";
                          var donnee="Modification des infos d'une quota. ";
                          ajouter(email,donnee);
            res.status(200).json({ message: 'Infos modifiées !' });
            
     }else 
     {
            res.json({"Error": "quotta n'existe pas "});
     }
     
 }