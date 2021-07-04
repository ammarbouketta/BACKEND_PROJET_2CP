var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
const Demandeur = require('../Models/demandeur').Demandeur_db;
const Recours = require('../Models/recours').Recours_db;
var fs = require('fs');
var path = require('path');
const ecrire = require('../Models/demandeur').ecrire;
const ecrirer = require('../Models/recours').ecrire;
const { ajouter } = require('./historique');
const jwt = require('jsonwebtoken');

function replaceErrors(key, value) {
    if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
            error[key] = value[key];
            return error;
        }, {});
    }
    return value;
}

function errorHandler(error) {
    console.log(JSON.stringify({ error: error }, replaceErrors));

    if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function(error) {
            return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);

    }
    throw error;
}

exports.accuse = (req, res) => {
    var content = fs.readFileSync(path.resolve('./pdf-form', 'Accusé_Reception_recours_0.docx'), 'binary');
    var zip = new PizZip(content);
    var doc;
    try {
        doc = new Docxtemplater(zip);
    } catch (error) {
        errorHandler(error);
    };
    var obj;
    fs.readFile('./files/demandeur.json', 'utf8', function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        var i = 0;
        var k = 1;
        for (i = 0; i < obj.length && k != 0; i++) {
            console.log(obj[i].Numero_dossier)
            if (obj[i].Numero_dossier === req.body.num_dossier) {

                k = 0;
            }
        };
        if (k == 0) {
            doc.setData({
                Numero_dossier: obj[i - 1].Numero_dossier,
                nom: obj[i - 1].info_generale.nom.toUpperCase() + " " + obj[i - 1].info_generale.prenom.toUpperCase(),
                matricule: obj[i - 1].matricule,
                motif: obj[i - 1].Recours[obj[i - 1].Recours.length - 1].motif,
                date: obj[i - 1].Recours[obj[i - 1].Recours.length - 1].date_recours
            });

            try {
                doc.render()
            } catch (error) {
                errorHandler(error);
            }

            var buf = doc.getZip().generate({ type: 'nodebuffer' });
            fs.writeFileSync(path.resolve('./pdf-form', 'Accusé_Reception_Recours.docx'), buf);
            var email="test3@esi.dz";
            var donnee="Génération de l'accusée de reception du recours d'un demandeur . ";
            ajouter(email,donnee);
            //res.json({ "message": "opp terminée" });
            //cette instruction permet d'envoyer l'accusé de reception au navigateur
            res.download("./pdf-form/Accusé_Reception1.docx", 'Accusé_Reception.docx');
        } else {
            res.json({ Error: "Le numero de demandeur saisi n'existe pas!" })
        };
    });
};


exports.ajout_recours = (req, res, next) => {//qui permet d'ajouterun recours à la liste de recours 
    //si le demandeur existe
    if (Demandeur({ "Numero_dossier": req.body.Numero_dossier }).get().length == 1) {

        //var liste_recours = Demandeur({ "Numero_dossier": req.body.Numero_dossier }).select("Recours")[0];
        let date_ob = new Date(); 
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var la_date = date + "/" + month + "/" + date_ob.getFullYear() + " - " + (date_ob.getHours()+2) + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds();
        Recours.insert({
            //on ajoute le recours avec:ladate ,heure ,nom ,prenom,matricule,date de recours,et motif de recours
            "nom":Demandeur({ "Numero_dossier": req.body.Numero_dossier }).select("info_generale")[0].nom,
            "prenom":Demandeur({ "Numero_dossier": req.body.Numero_dossier }).select("info_generale")[0].prenom,
            "matricule":Demandeur({ "Numero_dossier": req.body.Numero_dossier }).select("matricule")[0],
            "date_recours": la_date,
            "motif": req.body.motif || "Champ non spécifié"
        });
        ecrirer();
              Demandeur({"Numero_dossier":req.body.Numero_dossier}).update(
                {
                    "Numero_dossier":"R"+req.body.Numero_dossier,
                } 
                ); 
                ecrire();
        
        const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const email = decodedToken.email;
        var donnee="Ajout d'un recours.";
        ajouter(email,donnee);
        res.status(200).json({ message: ' opp  terminée !' });

    } else {
        res.status(500).json({ Error: "Le numero de demandeur saisi n'existe pas!" });
    }
};

exports.afficher = (req, res,next) => {//afficher la listedes demandeurs qui ont fait le recours 
    const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const email = decodedToken.email;
    var donnee="Affichage de la liste des recours.";
    ajouter(email,donnee);
    res.json(Recours().get());
    next();

}