var critere = require('../Models/critere').Critere_db;
var demandeur = require('../Models/demandeur').Demandeur_db;
var ecrire = require('../Models/critere').ecrire;
var ecrire2 = require('../Models/demandeur').ecrire;
const { ajouter } = require('./historique');

exports.ajout_critere = (req, res, next) => {
    if (critere({ "categorie": req.body.categorie }).get().length === 1)
    {
        try{
            var obj=critere({"categorie":req.body.categorie}).select("criteres")[0];
            obj.push(
                        {
                              "nom":req.body.nom,
                              "point":req.body.point
                        }
                    );
            const crit = critere.merge(
                        {
                            "categorie":req.body.categorie,
                            "criteres":obj
                        },"categorie"
                        );
            ecrire();
            var email="test3@esi.dz";
            var donnee="Ajout d'une critére ";
            ajouter(email,donnee);
            demandeur().each(info =>{
                    for(var i=0;i<info.nb_point_par_critere.length;i++)
                       {  
                            if(info.nb_point_par_critere[i].categorie===req.body.categorie)
                              {
                                  info.nb_point_par_critere[i].criteres= obj;
                                  ecrire2();
                              }
                        }
                         
                });
                
                res.status(201).json("Critére bien ajouter !!");
            } catch (error) { res.status(500).json({ error })};
       
    }
    else 
       {
            const crit = critere.insert(
                        {
                              "categorie" :req.body.categorie,
                              "criteres":
                            [
                                { 
                                    "nom":req.body.nom,
                                    "point":req.body.point
                                }
                            ]
           
                        });
                        ecrire();
            demandeur().each(info =>{
                var i=info.nb_point_par_critere.length;
                    info.nb_point_par_critere[i]={
                                      "categorie" :req.body.categorie,
                                      "criteres":
                                    [
                                        { 
                                            "nom":req.body.nom,
                                            "point":req.body.point
                                        }
                                    ]
                            }
                        ecrire2();
                        });
                        
                          var email="test3@esi.dz";
                          var donnee="Ajoute d'une catégorie ";
                          ajouter(email,donnee);
            res.status(201).json({ message: 'catégorie ajouter avec son propre critére !' });   
        }
      
}


const situation_familliale = (id) => {
    obj = Demandeur({ "Numero_dossier": id }).get()[0];
    obj.criteres[0].criteres[0].value = 0;
    obj.criteres[0].criteres[1].value = 0;
    obj.criteres[0].criteres[2].value = 0;
    obj.criteres[0].criteres[3].value = 0;
    obj.criteres[0].criteres[4].value = 0;
    if (obj.info_generale.Situation_familliale === "célibataire") {
        var age = Number((new Date().getTime() - new Date(obj.info_generale.Date_de_naissance).getTime()) / 31536000000);
        if ((age >= 25) && (age < 30)) {
            obj.criteres[0].criteres[0].value = 1;
        } else if (age >= 30 && age < 35) {
            obj.criteres[0].criteres[1].value = 2;
        } else if (age >= 35) {
            obj.criteres[0].criteres[2].value = 3;
        }
    } else if (obj.info_generale.Situation_familliale === "marié" || obj.info_generale.Situation_familliale === "divorcé" || obj.info_generale.Situation_familliale === "veuf") {
        obj.criteres[0].criteres[3].value = 4;
    };
    switch (obj.info_generale.Nombre_enfants) {
        case 1:
            obj.criteres[0].criteres[4].value = 2;
            break;
        case 2:
            obj.criteres[0].criteres[4].value = 4;
            break;
        case 3:
            obj.criteres[0].criteres[4].value = 6;
            break;
        case 4:
            obj.criteres[0].criteres[4].value = 8;
            break;
        default:
            obj.criteres[0].criteres[4].value = 10;
    }
    return objet.criteres[0];
};
const Grade = (id) => {
    obj = Demandeur({ "Numero_dossier": id }).get()[0];
    obj.criteres[1].criteres[0].value = 0;
    obj.criteres[1].criteres[1].value = 0;
    obj.criteres[1].criteres[2].value = 0;
    obj.criteres[1].criteres[3].value = 0;
    obj.criteres[1].criteres[4].value = 0;
    switch (obj.Experience_professionnelle.Grade) {
        case "1-4":
            obj.criteres[1].criteres[0].value = 1;
            break;
        case "5-9":
            obj.criteres[1].criteres[1].value = 2;
            break;
        case "10-11":
            obj.criteres[1].criteres[2].value = 3;
            break;
        case "12-15":
            obj.criteres[1].criteres[3].value = 4;
            break;
        case "16- et plus":
            obj.criteres[1].criteres[4].value = 5;
            break;
    };
    return obj.criteres[1];
};
const conjoint_mesrs = (id) => {
    obj = Demandeur({ "Numero_dossier": id }).get()[0];
    obj.criteres[3].criteres[0].value = 0;
    if (obj.Conjoint.Conjoint_MESRS) {
        obj.criteres[3].criteres[0].value = 2;
    }
    return obj.criteres[3];
};
const ayant_droit = (id) => {
    obj = Demandeur({ "Numero_dossier": id }).get()[0];
    obj.criteres[5].criteres[0].value = 0;
    obj.criteres[5].criteres[1].value = 0;
    obj.criteres[5].criteres[2].value = 0;
    obj.criteres[5].criteres[3].value = 0;
    if (obj.Ayant_droit.fils_chahid) {
        obj.criteres[5].criteres[3].value = 6;
    };
    if (obj.Ayant_droit.Moujahid) {
        obj.criteres[5].criteres[0].value = 6;
    };
    if (obj.Ayant_droit.fille_chahid) {
        obj.criteres[5].criteres[1].value = 6;
    };
    if (obj.Ayant_droit.veuf_chahid) {
        obj.criteres[5].criteres[2].value = 6;
    };
    return obj.criteres[5];
};
const anciennete = (id) => {
    obj = Demandeur({ "Numero_dossier": id }).get()[0];
    obj.criteres[2].criteres[0].value = 0;
    obj.criteres[2].criteres[1].value = 0;
    var anciennetee = Number((new Date(obj.Experience_professionnelle.date_fin_activite).getTime() - new Date(obj.Experience_professionnelle.date_debut_activite).getTime()) / 31536000000);
    obj.criteres[2].criteres[0].value =  Math.floor(anciennetee)*3;
    if (obj.Experience_professionnelle.Hors_secteur_MERSRS) {
        var anciennetee = Number((new Date(obj.Experience_professionnelle.date_fin_activite_Mersrs).getTime() - new Date(obj.Experience_professionnelle.date_debut_activite_Mersrs).getTime()) / 31536000000);
        switch (anciennetee) {
            case 1:
                obj.criteres[2].criteres[1].value = 1;
                break;
            case 2:
                obj.criteres[2].criteres[1].value = 2;
                break;
            case 3:
                obj.criteres[2].criteres[1].value = 3;
                break;
            case 4:
                obj.criteres[2].criteres[1].value = 4;
                break;
            default:
                obj.criteres[2].criteres[1].value = 5;
        }
        //hors mesrs
    };

};
const responsabilites = (id) => {
    dem = Demandeur({ "Numero_dossier": id }).get()[0];
    obj=Critere({"categorie": "responsabilités administratives"}).get()[0].criteres;
obj.forEach(element => {
    if (element.nom==dem.Experience_professionnelle.Responsabilite){
        element.value=2;
    }else{
        element.value=0;
    }
});
return obj;
};

const affectation_id = (id) => {
    obj = Demandeur({ "Numero_dossier": id }).get()[0];
    Demandeur({ "Numero_dossier": id }).update({
        "nb_point_par_critere": [{
                "categorie": "Situation familialle",
                "criteres": situation_familliale(id)
            },
            {
                "categorie": "Grade",
                "criteres": Grade(id)
            },
            {
                "categorie": "ancienneté par année",
                "criteres": ancienneté(id)
            },
            {
                "categorie": "conjoint au MESRS",
                "criteres": conjoint_mesrs(id)
            },
            {
                "categorie": "responsabilités administratives",
                "criteres": [{
                        "nom": "secretaire_general",
                        "value": 2
                    },
                    {
                        "nom": "sous_directeur",
                        "value": 2
                    },
                    {
                        "nom": "responsable_de_structure",
                        "value": 2
                    },
                    {
                        "nom": "chef_de_service_rectorat",
                        "value": 2
                    },
                    {
                        "nom": "chef_de_bureau",
                        "value": 2
                    },
                    {
                        "nom": "chef_de_service_institut",
                        "value": 2
                    },
                    {
                        "nom": "chef_de_section",
                        "value": 2
                    }
                ]
            },
            {
                "categorie": "ayant droit",
                "criteres": ayant_droit(id)
            },
            {
                "categorie": "ancienneté par année",
                "criteres":  anciennete(id)
            },
            {
                "categorie": "responsabilités administratives",
                "criteres": responsabilites(id)
            }
        ]
    });
    ecrire();
};

const affectation = () => {
    obj = Demandeur({
        "Dossier_complet": true,
        "benificiare": false,
        "valider":true
    }).get()[0];
    obj.forEach(element => {
        affectation_id(element.Numero_dossier);
    });
};
const _affectation = (req, res) => {
    obj = Demandeur({ "Numero_dossier": req.query.Numero_dossier }).select("nb_point_par_critere");
}
/*const _affectation = (req, res) => {
    obj = Demandeur({ "Numero_dossier": req.query.Numero_dossier }).select("nb_point_par_critere");
}*/
/*var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var critere = require('../Models/critere').Critere_db;
var fs = require('fs');
var path = require('path');
const dotEnv = require("dotenv");
const { stringify } = require('querystring');
const { get } = require('../routes/user');
var mergeJSON = require("merge-json") ;

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


exports.ajoutcritere = (req, res) => {
    var content = fs.readFileSync(path.resolve('./pdf-form', 'crit_model.docx'), 'binary');
    var zip = new PizZip(content);
    var doc;
    try {
        doc = new Docxtemplater(zip);
    } catch (error) {
        errorHandler(error);
    }

    var obj;
    fs.readFile('C:\\Users\\dell\\backend-projet-2CP\\files\\critere.json', 'utf8', function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        
            if (  req.body.categorie==="situation_familiale" )
                { 
                    obj[0].nom=req.body.nom;
                    obj[0].point=req.body.point; 
                }
            else {obj[0].nom=" ";
            obj[0].point=" ";
            }
            if (  req.body.categorie==="Grade" )
            { 
                obj[1].nom=req.body.nom;
                obj[1].point=req.body.point; 
                                
            }
           else {obj[1].nom=" ";
                obj[1].point=" ";
            }
           if (  req.body.categorie==="ancienneté par année" )
           { 
            obj[2].nom=req.body.nom;
            obj[2].point=req.body.point; 
            }
           else {obj[2].nom=" ";
           obj[2].point=" ";
            }
        if (  req.body.categorie==="conjoint au MESRS" )
        { 
        obj[3].nom=req.body.nom;
        obj[3].point=req.body.point; 
        
        }
              else {obj[3].nom=" ";
            obj[3].point=" ";

             }
            if (  req.body.categorie==="responsabilités administratives" )
             { 
              obj[4].nom=req.body.nom;
              obj[4].point=req.body.point; 
    
             }
           else {obj[4].nom=" ";
            obj[4].point=" ";
             }
             if (  req.body.categorie==="Ayant droit" )
            { 
            obj[5].nom=req.body.nom;
              obj[5].point=req.body.point; 
    
          }
           else {obj[5].nom=" ";
          obj[5].point=" ";
          }
          if (  req.body.categorie==="Autre" )
         { 
            obj[6].nom=req.body.nom;
           obj[6].point=req.body.point; 
    
           }
            else {
           obj[6].nom=" ";
              obj[6].point=" ";
           }
   
      
        doc.setData({
          nom: obj[0].nom,
          point:obj[0].point,
          newcritere:"{nom}                                                                                       {point}                                                                   {newcritere}",         
          nom1:obj[1].nom,
          point1:obj[1].point,
          newcritere1:"{nom1}                                                                                      {point1}                                                                   {newcritere1}",          
          nom2:obj[2].nom,
          point2:obj[2].point,
          newcritere2:"{nom2}                                                                                       {point2}                                                                   {newcritere2}",
          nom3:obj[3].nom,
          point3:obj[3].point,
          newcritere3:"{nom3}                                                                                       {point3}                                                                   {newcritere3}",
          nom4:obj[4].nom,
          point4:obj[4].point,
          newcritere4:"{nom4}                                                                                       {point4}                                                                   {newcritere4}",
          nom5:obj[5].nom,
          point5:obj[5].point,
          newcritere5:"{nom5}                                                                                       {point5}                                                                   {newcritere5}",
          newcat:obj[6].categorie,
          nom6:obj[6].nom,
          point6:obj[6].point,
          newcritere6:"{nom6}                                                                                       {point6}                                                                   {newcritere6}",

         
         
        });
    
        try 
        {
            doc.render()
        } catch (error)
        {
            errorHandler(error);
        }

       
        var buf = doc.getZip().generate({ type: 'nodebuffer' });
        fs.writeFileSync(path.resolve('./pdf-form', 'crit_model.docx'), buf);
        fs.writeFileSync(path.resolve('./pdf-form', 'crit_fich.docx'), buf);

        res.json({ "message": "opp terminée" });
    });
       
        var content1 = fs.readFileSync(path.resolve('./pdf-form', 'crit_fich.docx'), 'binary');
         var zip1 = new PizZip(content1);
         var doc1;
        try {
            doc1 = new Docxtemplater(zip1);
        } catch (error) {
            errorHandler(error);
        }
    
   

           doc1.setData({
            nom: " ",
            point:" ",
            newcritere:" ",         
            nom1:" ",
            point1:" ",
            newcritere1:" ",          
            nom2:" ",
            point2:" ",
            newcritere2:" ",
            nom3:" ",
            point3:" ",
            newcritere3:" ",
            nom4:" ",
            point4:" ",
            newcritere4:" ",
            nom5:" ",
            point5:" ",
            newcritere5:" ",
            newcat:" ",
            nom6:" ",
            point6:" ",
            newcritere6:" ",
  
           
           
          });
      
        
          try 
          {
              doc1.render()
          } catch (error)
          {
              errorHandler(error);
          }
  
          var buf1 = doc1.getZip().generate({ type: 'nodebuffer' });
          fs.writeFileSync(path.resolve('./pdf-form', 'crit_fichier.docx'), buf1);
    

    
        
}
*/