var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var demandeur = require('../Models/demandeur').Demandeur_db;
const Classement = require('../Models/classement').Classement_db;
var fs = require('fs');
var path = require('path');
const ecrire = require('../Models/demandeur').ecrire;
const { ajouter } = require('./historique');
const ecrireC = require('../Models/classement').ecrire;


function replaceErrors(key, value)
{
    if (value instanceof Error)
    {
        return Object.getOwnPropertyNames(value).reduce(function(error, key) 
        {
            error[key] = value[key];
            return error;
        }, {});
    }
    return value;
}

function errorHandler(error) 
{
    console.log(JSON.stringify({ error: error }, replaceErrors));
    if (error.properties && error.properties.errors instanceof Array)
    {
        const errorMessages = error.properties.errors.map(function(error)
        {
            return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);
       
    }
    throw error;
}


exports.etat_actual_demand = (req, res) => {

    var content = fs.readFileSync(path.resolve('./pdf-form', 'AC.docx'), 'binary');
    var zip = new PizZip(content);
    var doc;
    try
    {
        doc = new Docxtemplater(zip);
    } catch (error){ errorHandler(error);}

    var obj;
    fs.readFile('./files/demandeur.json', 'utf8', function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        var i = 0;
        var k = 1;
        for (i = 0; i < obj.length && k != 0; i++) 
        {
            if (obj[i].Numero_dossier ===  req.body.num_dossier )
                { 
                  
                   k = 0; 
                }

        };
    if(k==0)
    {
        var moujahid;
        if(obj[i-1].Ayant_droit.Moujahid===true){moujahid = "X"}
        else moujahid=" ";
        var fils;
        if(obj[i-1].Ayant_droit.fils_chahid===true){fils = "X"}
        else fils=" ";
        var fille;
        if(obj[i-1].Ayant_droit.fille_chahid===true){fille = "X"}
        else fille=" ";
        var veuf;
        if(obj[i-1].Ayant_droit.veuf_chahid===true){veuf = "X"}
        else veuf=" ";
        var valide;
        if(obj[i-1].valider===true){valide = "X"}
        else valide=" ";
        var beneficiare;
        if(obj[i-1].beneficiare===true){beneficiare = "X"}
        else beneficiare=" ";
        var dossier_complet;
        if(obj[i-1].dossier_complet===true){dossier_complet = "X"}
        else dossier_complet=" ";
        var hors_secteur_MERSRS;
        if(obj[i-1].Experience_professionnelle.Hors_secteur_MERSRS===true){hors_secteur_MERSRS = "X"}
        else hors_secteur_MERSRS=" ";
        var Conjoint_MESRS;
        if(obj[i-1].Conjoint.Conjoint_MESRS===true){Conjoint_MESRS = "X"}
        else Conjoint_MESRS=" ";
        
        doc.setData({
            Numero_dossier: obj[i - 1].Numero_dossier,
            nom: obj[i-1].info_generale.nom,
            prenom: obj[i-1].info_generale.prenom,
            nomar: obj[i-1].info_generale.nomar,
            beneficiare:beneficiare,
            prenomar: obj[i-1].info_generale.prenomar,
            matricule: obj[i-1].matricule,
            dossier_complet:dossier_complet,
            Date_de_naissance: obj[i-1].info_generale.Date_de_naissance,
            Commune_de_naissance: obj[i-1].info_generale.Commune_de_naissance,
            Willaya_de_naissance: obj[i-1].info_generale.Willaya_de_naissance,
            address: obj[i-1].info_generale.Adresse,
            numero_tel: obj[i-1].info_generale.numero_de_tel,
            Sexe: obj[i-1].info_generale.Sexe,
            Email: obj[i-1].info_generale.Email,
            code_postal: obj[i-1].info_generale.code_postal,
            Prenom_du_pere: obj[i-1].info_generale.Prenom_du_pere,
            Nom_mere: obj[i-1].info_generale.Nom_mere,
            Prenom_mere: obj[i-1].info_generale.Prenom_mere,
            Situation_familliale: obj[i-1].info_generale.Situation_familliale,
            Nombre_enfants: obj[i-1].info_generale.Nombre_enfants,
            Nombre_de_points: obj[i-1].Nombre_de_points,
            direction: obj[i-1].Experience_professionnelle.direction,
            Etablissement: obj[i-1].Experience_professionnelle.Etablissement,
            Grade: obj[i-1].Experience_professionnelle.Grade,
            date_debut_activite: obj[i-1].Experience_professionnelle.date_debut_activite,
            date_fin_activite: obj[i-1].Experience_professionnelle.date_fin_activite,
            date_debut_activite_Mersrs: obj[i-1].Experience_professionnelle.date_debut_activite_Mersrs,
            date_fin_activite_Mersrs: obj[i-1].Experience_professionnelle.date_fin_activite_Mersrs,
            Responsabilite: obj[i-1].Experience_professionnelle.Responsabilite,
            hors_secteur_MESRS: hors_secteur_MERSRS,
            nom1: obj[i-1].Conjoint.nomco,
            prenom1: obj[i-1].Conjoint.prenomco,
            nomar1: obj[i-1].Conjoint.Nomarco,
            prenomar1: obj[i-1].Conjoint.prenomcoar,
            date_de_naissance1: obj[i-1].Conjoint.Date_de_naissanceco,
            Commune_de_naissance2: obj[i-1].Conjoint.Commune_de_naissanceco,
            Willaya_de_naissance2: obj[i-1].Conjoint.Willaya_de_naissanceco,
            Prenom_du_pere2: obj[i-1].Conjoint.Prenom_du_pereco,
            Nom_mere2: obj[i-1].Conjoint.Nom_mereco,
            Prenom_mere2: obj[i-1].Conjoint.Prenom_mereco,
            Conjoint_MESRS: Conjoint_MESRS,
            Moujahid: moujahid,
            fils_chahid: fils,
            fille_chahid: fille,
            veuf_chahid: veuf,
            date_recours: obj[i-1].Recours.date_recours||"/",
            motif: obj[i-1].Recours.motif||"/",
            valide :valide,
            categorie:obj[i-1].nb_point_par_critere,
           // image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIJBywfp3IOswAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAkUlEQVQY052PMQqDQBREZ1f/d1kUm3SxkeAF/FdIjpOcw2vpKcRWCwsRPMFPsaIQSIoMr5pXDGNUFd9j8TOn7kRW71fvO5HTq6qqtnWtzh20IqE3YXtL0zyKwAROQLQ5l/c9gHjfKK6wMZjADE6s49Dver4/smEAc2CuqgwAYI5jU9NcxhHEy60sni986H9+vwG1yDHfK1jitgAAAABJRU5ErkJggg=="
            
        });
     
        try 
          {
               doc.render();
          } catch (error)
          {
               errorHandler(error);
          }

        var buf = doc.getZip().generate({ type: 'nodebuffer' });
        fs.writeFileSync(path.resolve('./pdf-form', 'ACNEW.docx'), buf);
        var email="test3@esi.dz";
        var donnee="Affichage de l'état actuel d'un demandeur qui le numéro de dossier "+obj[i-1].Numero_dossier;
        ajouter(email,donnee);
        res.json({ "message": "opp terminée" });
    }
    else
         {
               res.json({ "message": "demandeur non existant " })
         };
    });
 
}

exports.valider = (req, res,next) => {
   if (demandeur({"Numero_dossier":req.body.Numero_dossier}).get().length ===1)
    {
         try{      
                   const demand = demandeur({"Numero_dossier":req.body.Numero_dossier}).update(
                        {
                            "valider":req.body.valider,
                        } 
                        ); 
                ecrire(); 
                      
                        var email="test3@esi.dz";
                        var donnee="Validation d'un demandeur . ";
                        ajouter(email,donnee);
                        res.status(200).json({ message: 'Infos modifiées !' });
    
            }catch (error) { res.status(500).json({ error })};
        
    } 
    else 
    {
        res.json({"Error": "le demandeur n'existe pas " });
        
    }
   next();
}

exports.delete = (req, res, next) => {
    if (demandeur({ "Numero_dossier": req.body.Numero_dossier }).get().length === 1) {
        demandeur({ "Numero_dossier": req.body.Numero_dossier }).remove();
        ecrire();
        var email="test3@esi.dz";
        var donnee="Suppresion d'un demandeur ";
        ajouter(email,donnee);
        res.status(200).send({ message: "Suppression faite avec succés" })
    } else {
        res.status(500).send({ Error: "demandeur n'existe pas" })
    }
};

const calcul_value = (id_demandeur) => {
    if (demandeur({ "Numero_dossier": id_demandeur }).get().length == 1) {
        var s = 0;
        obj = demandeur({ "Numero_dossier": id_demandeur }).select("nb_point_par_critere")[0];
        obj.forEach(element => {
            (element.criteres).forEach(c => {
                s += c.nb_points;
            });
        });
        demandeur({ "Numero_dossier": id_demandeur }).update({
            "Nombre_de_points": s
        });
        ecrire();
        var email="test3@esi.dz";
        var donnee="Calcule le nombre de point d'un demandeur .";
        ajouter(email,donnee);
        return s;
    }
};
exports.afficher = (req, res, next) => {
    calcul_value(req.body.Numero_dossier);
    //res.json(calcul_value(req.body.Numero_dossier));
    res.json({ message : 'done'})
}



exports.classement = (req, res, next) => {
    obj = demandeur({
        "valider": true,
        "dossier_complet": true,
        "beneficiare": false,
    }).order("Nombre_de_points desc").get();
    Classement().remove();
    var i = 0;
    obj.forEach(element => {
        i++;
        Classement.insert({
            nom: element.info_generale.nom + " " + element.info_generale.prenom,
            num_dossier: element.Numero_dossier,
            nb_points: element.Nombre_de_points,
            classement: i
        });
    });
    ecrireC();
    var email="test3@esi.dz";
    var donnee="Classement des demandeurs .";
    ajouter(email,donnee);
    res.json(Classement().get());
};




exports.classement_pdf = (req, res, next) => {
    var content = fs.readFileSync(path.resolve('./pdf-form', 'classement.docx'), 'binary');
    var zip = new PizZip(content);
    var doc;
    try {
        doc = new Docxtemplater(zip);
    } catch (error) {
        errorHandler(error);
    }
    var obj = demandeur({
        "valider": true,
        "dossier_complet": true,
        "beneficiare": false,
    }).order("Nombre_de_points desc").get();
    var i = 0;
    Classement().remove();
    obj.forEach(element => {
        i++;
        Classement.insert({
            nom: element.info_generale.nom + " " + element.info_generale.prenom,
            num_dossier: element.Numero_dossier,
            nb_points: element.Nombre_de_points,
            classement: i
        });
    });
    ecrireC();
    if (obj.length != 0) {

        console.log(Classement().get());
        doc.setData({
            "classement": Classement().get()
        });
        try {
            doc.render();
        } catch (error) {
            errorHandler(error);
        }
        var buf = doc.getZip().generate({ type: 'nodebuffer' });
        fs.writeFileSync(path.resolve('./pdf-form', 'classement1.docx'), buf);
        var email="test3@esi.dz";
        var donnee="Affichage du classement des demandeurs .";
        ajouter(email,donnee);
        res.json({ "message": "opp terminée" });
    } else {
        res.json({ "message": "demandeur non existant " });
    };
};


 
exports.accuse_recep = (req, res) => {
    
    var content = fs
    .readFileSync(path.resolve('./pdf-form', 'Accuse_de_reception.docx'), 'binary');

    var zip = new PizZip(content);
    var doc;
    try {
    doc = new Docxtemplater(zip);
    } catch(error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    writing.errorHandler(error);
    }

    //checkbox verification
    if (req.body.photo) {ch1 = 'X'} else {ch1 = ''};
    if (req.body.demande_manuscrite) {ch2 = 'X'} else {ch2 = ''};
    if (req.body.photocopie_piece_idt) {ch3 = 'X'} else {ch3 = ''};
    if (req.body.fiche_renseignement) {ch4 = 'X'} else {ch4 = ''};
    if (req.body.extrait_naissance) {ch5 = 'X'} else {ch5 =''};
    if (req.body.fiche_familiale_ou_individuelle) {ch6 = 'X'} else {ch6 = ''};
    if (req.body.pv_de_la_1er_installation_dans_la_poste) {ch7 = 'X'} else {ch7 = ''};
    if (req.body.arreté_de_nomination_visé) {ch8 = 'X'} else {ch8 = ''};
    if (req.body.arreté_de_responsabilité_visé) {ch9 = 'X'} else {ch9 = ''};
    if (req.body.arreté_nomination_MESRS) {ch10 = 'X'} else {ch10 = ''};
    if (req.body.arreté_nomination_conjoint) {ch11 = 'X'} else {ch11 = ''};
    if (req.body.attestation_ayant_droit) {ch12 = 'X'} else {ch12 = ''};

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();
const date_heure =date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds; 
// prints date & time in YYYY-MM-DD HH:MM:SS format

    //set the templateVariables
    doc.setData({
    //remplir le formulaire avec les données venu de front
    Matricule: req.body.matricule,
    fullname : req.body.fullname,
    ch1 : ch1,
    ch2 : ch2,
    ch3 : ch3,
    ch4 : ch4,
    ch5 : ch5,
    ch6 : ch6,
    ch7 : ch7,
    ch8 : ch8,
    ch9 : ch9,
    ch10 : ch10,
    ch11 : ch11,
    ch12 : ch12,
    date_heure : date_heure,

    });

    try {
        
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
    }
    catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
    writing.errorHandler(error);
    }

    var buf = doc.getZip().generate({type: 'nodebuffer'});
    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.resolve('./pdf-form', 'Accuse_de_reception11.docx'), buf);

    var email="test3@esi.dz";
    var donnee="Génération de l'accusée de reception d'un demandeur . ";
    ajouter(email,donnee);
    res.json({ "message": "opp terminer " });
    
}
    



    exports.form_demand = (req, res, next) => {
        //console.log(req.body)
        
        if (demandeur({ "matricule": req.body.matricule }).get().length === 0) {
             let year;      
                try {

                    let lastnum = demandeur().last().Numero_dossier;
                    let n=demandeur().last().Numero_dossier;
                    lastnum=lastnum.substring(lastnum.length - 4);
                    n=n.substring(0,4);
                    // //console.log(n);
                    var i = Number(n) ;
                    let date_ob = new Date();
                    year = date_ob.getFullYear();
                    if(lastnum<year||demandeur().get().length==0) i=0000;
                    i=i+1;
                    if (i<10) i="000"+i;
                    if (i>=10&&i<100) i="00"+i;
                    if (i>=100&&i<1000) i="0"+i;
                    
                    const Numero_dossier = i+"/"+year;
                    const matricule= req.body.matricule;
                    const Nombre_de_points= 0;
                    const info_generale = {
                        nom: req.body.nom||"",
                        prenom: req.body.prenom||"",
                        nomar: req.body.nomar||"",
                        prenomar: req.body.prenomar||"",
                        Adresse: req.body.Adresse||"",
                        numero_de_tel: req.body.numero_de_tel||"",
                        Date_de_naissance: req.body.Date_de_naissance||"",
                        Commune_de_naissance: req.body.Commune_de_naissance||"",
                        Willaya_de_naissance: req.body.Wilaya_de_naissance||"",
                        Sexe: req.body.Sexe||"",
                        Email: req.body.Email||"",
                        code_postal: req.body.code_postal||"",
                        Prenom_du_pere: req.body.Prenom_du_pere||"",
                        Nom_mere: req.body.Nom_mere||"",
                        prenom_mere: req.body.prenom_mere||"",
                        Situation_familiale: req.body.Situation_familiale||"",
                        Nombre_enfants: req.body.Nombre_enfants||"",
                        photo: req.body.photo||"",
                    };

                    const Experiance_professionnelle = {
                        direction: req.body.direction||"",
                        Etablissement: req.body.Etablissement||"",
                        Grade: req.body.Grade||"",
                        date_debut_activite: req.body.date_debut_activite||"",
                        date_fin_activite: req.body.date_fin_activite||"",
                        Hors_secteur_MERSRS:req.body.Hors_secteur_MERSRS||false,
                        date_debut_activite_Mersrs: req.body.date_debut_activite_Mersrs||"",
                        date_fin_activite_Mersrs: req.body.date_fin_activite_Mersrs||"",
                        Responsabilite: req.body.Responsabilite||"",
                    };
                    const Conjoint = {
                        nomco: req.body.nomco||"",
                        Nomarco: req.body.Nomarco||"",
                        prenomco: req.body.prenomco||"",
                        prenomarco: req.body.prenomarco||"",
                        Date_de_naissanceco: req.body.Date_de_naissanceco||"",
                        Willaya_de_naissanceco: req.body.Willaya_de_naissanceco||"",
                        Commune_de_naissanceco: req.body.Commune_de_naissanceco||"",
                        prenom_du_pereco: req.body.prenom_du_pereco||"",
                        nom_mereco: req.body.nom_mereco||"",
                        prenom_mereco: req.body.prenom_mereco||"",
                        Conjoint_MESRS: req.body.Conjoint_MESRS||false,
                        
                    }
                     const Ayant_droit = {
                         Moujahid: req.body.droit.includes("Moudjahid")||false,
                         fils_chahid: req.body.droit.includes("Fils de chahid")||false,
                         veuf_chahid: req.body.droit.includes("Fille de Chahid")||false,
                         fille_chahid: req.body.droit.includes("Veuf de Chahid")||false,
                
                     };
                    //const Ayant_droit = req.body.Ayant_droit
                    const Recours = [];
                    const dossier_complet = req.body.dossier_complet||false;
                    const valider = true;
                    const beneficiare = false;


                    const celib1 = { "nom": "celibataire 25 30 ans",
                    "nb_points": 0};
                    const celib2 = {"nom": "celibataire 30 35 ans",
                    "nb_points": 0};
                    const celib3 = {"nom": "celibataire 35 et plus",
                    "nb_points": 0};
                    const marie = {"nom": "marié/divorce/veuf",
                    "nb_points": 0};
                    const enfant = {"nom": "enfant",
                    "nb_points": 0};
                    const categorie1 =[celib1, celib2, celib3, marie, enfant];

                    const grade1 = {"nom": "1_4",
                    "nb_points": 0};
                    const grade2 = {"nom": "5_9",
                    "nb_points": 0};
                    const grade3 = { "nom": "10_11",
                    "nb_points": 0};
                    const grade4 = {"nom": "12_15",
                    "nb_points": 0};
                    const grade5 = {"nom": "16_et_plus",
                    "nb_points": 0};
                    const categorie2 = [grade1, grade2, grade3, grade4, grade5];

                    const ancien1 = {"nom": "ancienneté MESRS",
                    "nb_points": 0};
                    const ancien2 = {"nom" : "ancienneté hors secteur (FP)", 
                    "nb_points": 0};
                    const categorie3 = [ancien1, ancien2];

                    const conjoint1 = {"nom": "conjoint_mers",
                    "nb_points": 0};
                    const categorie4 = [conjoint1];

                    const respo1 = {"nom": "secretaire_general",
                    "nb_points": 0};
                    const respo2 = {"nom": "sous_directeur",
                    "nb_points": 0};
                    const respo3 = {"nom": "responsable_de_structure",
                    "nb_points": 0};
                    const respo4 = {"nom": "chef_de_service_rectorat",
                    "nb_points": 0};
                    const respo5 = {"nom": "chef_de_bureau",
                    "nb_points": 0};
                    const respo6 = {"nom": "chef_de_service_institut",
                    "nb_points": 0};
                    const respo7 = {"nom": "chef_de_section",
                    "nb_points": 0};
                    const categorie5 = [respo1, respo2, respo3, respo4, respo5, respo6, respo7];

                    const grd1 = {"nom": "Moudjahid",
                    "nb_points": 0};
                    const grd2 = { "nom": "fille_chahid",
                    "nb_points": 0};
                    const grd3 = {"nom": "veuf_chahid",
                    "nb_points": 0};
                    const grd4 = {"nom": "fils_chahid",
                    "nb_points": 0};
                    const categorie6 = [grd1, grd2, grd3, grd4];

                    const criteres = [
                        {
                         "categorie": "Situation familialle",
                         "criteres" : categorie1,  
                        },
                        {
                         "categorie": "Grade",
                         "criteres": categorie2,
                        },
                        {
                         "categorie": "ancienneté par année",
                         "criteres": categorie3,
                        },
                        {
                         "categorie": "conjoint au MESRS",
                         "criteres": categorie4, 
                        },
                        {
                         "categorie": "responsabilités administratives",
                         "criteres" : categorie5,
                        },
                        {
                         "categorie": "Grade",
                         "criteres": categorie6,
                        },
                    ];  
       
                         const demand = demandeur.insert({
                        "Numero_dossier" : Numero_dossier,
                        "matricule":matricule,
                        "Nombre_de_points":Nombre_de_points,
                        "info_generale": info_generale,
                        "Experiance_professionnelle": Experiance_professionnelle,
                        "Conjoint": Conjoint,
                        "Ayant_droit": Ayant_droit,
                        "Recours": Recours,
                        "criteres" : criteres,
                        "dossier_complet" : dossier_complet,
                        "valider":valider,
                        "beneficiare":beneficiare,
                    });
                    ecrire(process.env.Demandeur_file, demandeur().get());
                    var email="test3@esi.dz";
                    var donnee="La saisie des informations d'un demandeur . ";
                    ajouter(email,donnee);
                    res.status(201).json({ message: 'Demandeur ajouté !', Numero_dossier: Numero_dossier });

                }
 
                
                catch (error) { res.status(500).json({ error })};
        } else {
            res.json({
                "Error": "le demandeur existe deja "
            });
        }
    
        
    }


    exports.infos_demandeur = (req, res, next) => {
        //console.log(demandeur({ "Numero_dossier": req.query.Numero_dossier }).get()[0])
        //const Numero_dossier = req.query.Numero_dossier
        if (demandeur({ "Numero_dossier": req.query.Numero_dossier }).get().length === 1) {
            try {
                const demand = demandeur({ "Numero_dossier": req.query.Numero_dossier }).get()[0];
                var email1="test3@esi.dz";
                var donnee="Affichage des informations d'un demandeur.";
                ajouter(email1,donnee);
                res.status(200).json({
                    "matricule" : demand.matricule,
                    "Numero_dossier" : demand.Numero_dossier,
                    "Nombre_de_points":demand.Nombre_de_points,
                    "info_generale": demand.info_generale,
                    "Experiance_professionnelle": demand.Experiance_professionnelle,
                    "Conjoint": demand.Conjoint,
                    "Ayant_droit": demand.Ayant_droit,
                    "Recours": demand.Recours,
                    "criteres" : demand.criteres,
                    "dossier_complet" : demand.dossier_complet,
                    "valider":demand.valider,
                    "beneficiare":demand.beneficiare,
                    "nb_point_par_critere":demand.nb_point_par_critere,
                });

            } catch (error) { res.status(400).json({ error }); }
        } else {
            res.json({
                "Error": "Demandeur n'existe pas "
            });
        }
        next();
    };


    exports.liste_demandeur = (req, res, next) => {
        var email1="test3@esi.dz";
        var donnee="Affichage de la liste des demandeurs .";
        ajouter(email1,donnee);
        res.json(demandeur().get());
        next();
    }


    
    
  exports.update_demandeur = (req, res, next) => {
        demandeur().each(update => {
            //info general
            if (update.Numero_dossier===req.body.Numero_dossier) {
                 update.info_generale.nom = req.body.nom||update.info_generale.nom;
                 update.info_generale.prenom = req.body.prenom||update.info_generale.prenom;
                 update.info_generale.nomar = req.body.nomar||update.info_generale.nomar;
                 update.info_generale.prenomar = req.body.prenomar||update.info_generale.prenomar;
                 update.info_generale.matricule = req.body.matricule||update.matricule;
                 update.info_generale.Adresse = req.body.Adresse||update.info_generale.Adresse;
                 update.info_generale.numero_de_tel = req.body.numero_de_tel||update.info_generale.numero_de_tel;
                 update.info_generale.Date_de_naissance = req.body.Date_de_naissance||update.info_generale.Date_de_naissance;
                 update.info_generale.Commune_de_naissance = req.body.Commune_de_naissance||update.info_generale.Commune_de_naissance;
                 update.info_generale.Willaya_de_naissance = req.body.Willaya_de_naissance||update.info_generale.Willaya_de_naissance;
                 update.info_generale.Sexe = req.body.Sexe||update.info_generale.Sexe;
                 update.info_generale.Email = req.body.Email||update.info_generale.Email;
                 update.info_generale.code_postal = req.body.code_postal||update.info_generale.code_postal;
                 update.info_generale.Prenom_du_pere = req.body.Prenom_du_pere||update.info_generale.Prenom_du_pere;
                 update.info_generale.Nom_mere = req.body.Nom_mere||update.info_generale.Nom_mere;
                 update.info_generale.prenom_mere = req.body.prenom_mere||update.info_generale.prenom_mere;
                 update.info_generale.Situation_familiale = req.body.Situation_familiale||update.info_generale.Situation_familiale;
                 update.info_generale.Nombre_enfants = req.body.Nombre_enfants||update.info_generale.Nombre_enfants;
                 update.info_generale.Nombre_de_points = req.body.Nombre_de_points||update.Nombre_de_points;
                 update.info_generale.photo = req.body.photo||update.info_generale.photo;

            //exp pro
                 update.Experience_professionnelle.direction = req.body.direction||update.Experience_professionnelle.direction;
                 update.Experience_professionnelle.Etablissement = req.body.Etablissement||update.Experience_professionnelle.Etablissement;
                 update.Experience_professionnelle.Grade = req.body.Grade||update.Experience_professionnelle.Grade;
                 update.Experience_professionnelle.date_debut_activite = req.body.date_debut_activite||update.Experience_professionnelle.date_debut_activite;
                 update.Experience_professionnelle.Hors_secteur_MERSRS = req.body.Hors_secteur_MERSRS||update.Experience_professionnelle.Hors_secteur_MERSRS;
                 update.Experience_professionnelle.date_debut_activite_Mersrs = req.body.date_debut_activite_Mersrs||update.Experience_professionnelle.date_debut_activite_Mersrs;
                 update.Experience_professionnelle.date_fin_activite_Mersrs = req.body.date_fin_activite_Mersrs||update.Experience_professionnelle.date_fin_activite_Mersrs;
                 update.Experience_professionnelle.Responsabilite = req.body.Responsabilite||update.Experience_professionnelle.Responsabilite;
           
            //conjoint
                 update.Conjoint.nomco = req.body.nomco||update.Conjoint.nomco;
                 update.Conjoint.Nomarco = req.body.Nomarco||update.Conjoint.Nomarco;
                 update.Conjoint.prenomco = req.body.prenomco||update.Conjoint.prenomco;
                 update.Conjoint.prenomarco = req.body.prenomarco||update.Conjoint.prenomarco;
                 update.Conjoint.Date_de_naissanceco = req.body.Date_de_naissanceco||update.Conjoint.Date_de_naissanceco;
                 update.Conjoint.Commune_de_naissanceco = req.body.Commune_de_naissanceco||update.Conjoint.Commune_de_naissanceco;
                 update.Conjoint.Willaya_de_naissanceco = req.body.Willaya_de_naissanceco||update.Conjoint.Willaya_de_naissanceco;
                 update.Conjoint.Prenom_du_pereco = req.body.Prenom_du_pereco||update.Conjoint.Prenom_du_pereco;
                 update.Conjoint.Nom_mereco = req.body.Nom_mereco||update.Conjoint.Nom_mereco;
                 update.Conjoint.prenom_mereco = req.body.prenom_mereco||update.Conjoint.prenom_mereco;
                 update.Conjoint.Conjoint_MESRS = req.body.Conjoint_MESRS||update.Conjoint.Conjoint_MESRS;

            //ayant droit
                 update.Ayant_droit.Moujahid = req.body.Moujahid||update.Ayant_droit.Moujahid;
                 update.Ayant_droit.fils_chahid = req.body.fils_chahid||update.Ayant_droit.fils_chahid;
                 update.Ayant_droit.veuf_chahid = req.body.veuf_chahid||update.Ayant_droit.veuf_chahid;
                 update.Ayant_droit.fille_chahid = req.body.fille_chahid||update.Ayant_droit.fille_chahid;
                 
            //recours     
                 update.Recours.motif =req.body.motif||update.Recours.motif;
                 update.Recours.date_recours =req.body.date_recours||update.Recours.date_recours;

            //info
                 update.dossier_complet = req.body.dossier_complet||update.dossier_complet;
                 update.valider = req.body.valider||update.valider;
                 update.beneficiare = req.body.beneficiare||update.beneficiare;
              
                ecrire();
                var email1="test3@esi.dz";
                var donnee="Modification des informations d'un demandeur .";
                ajouter(email1,donnee);

            }
            
             
            
        })
        res.json({ "message": "opp terminer " });

    }



    exports.test = (req, res) => {
        console.log(req)
        res.json({
            message : 'done'
        })
    }
     


