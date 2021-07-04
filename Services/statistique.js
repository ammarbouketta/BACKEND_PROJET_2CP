var statistique = require('../Models/statistique').Statistique_db;
var fs = require('fs');
var path = require('path');
var ecrire = require('../Models/statistique').ecrire;


exports.get_genre = (req, res, next) => {
    var nbm=0,pm=0;
    var nbf=0,pf=0;
        statistique().each(info => 
            {
                if (info.info_generale.Sexe=="masculin")
                   {
                       nbm=nbm+1;
                   }
                else
                   {
                      nbf=nbf+1;
                   }
            });  
      ecrire();
         pm=(nbm/(nbm+nbf))*100 ;
         pf=(nbf/(nbm+nbf))*100 ;  
         res.status(201).json({"le pourcentage des hommes est ":pm,"le pourcentage des femmes est ":pf});
}



exports.stat_dossier = (req, res, next) => {

    var benific=0,non_benific=0;
    var dossier_incomplet=0,dossier_complet=0;
    var valider=0,non_valider=0;
        statistique().each(info => 
           {
                if (info.valider==true)
                    {
                       valider=valider+1;
                    }
                else
                    {
                       non_valider=non_valider+1;
                    }
                if(info.beneficiare==true)
                    {
                       benific=benific+1;
                    }
                else
                    {
                       non_benific=non_benific+1;
                    }
                if(info.dossier_complet=true)
                    {
                       dossier_complet=dossier_complet+1;
                    }
                else
                    {
                       dossier_incomplet=dossier_incomplet+1;
                    }
    });  
            console.log("nombre des dossier complet est :",+dossier_complet);
            console.log("nombre des dossiers incomplet est :",+dossier_incomplet); 
            console.log("nombre des dossiers valider est :",+valider); 
            console.log("nombre des dossiers non valider est :",+non_valider); 
            console.log("nombre des dossiers bénéficiare est :",+benific); 
            console.log("nombre des dossiers non bénéficiare est :",+non_benific); 
 
      res.status(201).json({dossier_complet,dossier_incomplet,valider,non_valider,benific,non_benific});
}


exports.Age = (req, res, next) => {

    var entre_18_25=0,entre_25_40=0;
    var entre_40_55=0,entre_55_70=0,plus_70=0;
    var age=0;
        statistique().each(info => 
            {
                age= ((new Date().getTime() - new Date(info.info_generale.Date_de_naissance).getTime()) / 31536000000);
                if (age>=18 && age<25){entre_18_25=entre_18_25+1};
                if (age>=25 && age<40){entre_25_40=entre_25_40+1};
                if (age>=40 && age<55){entre_40_55=entre_40_55+1};
                if (age>=55 && age<70){entre_55_70=entre_55_70+1};
                if (age>=70){plus_70=plus_70+1};
                  console.log(age);
            });
            console.log(entre_18_25);
            console.log(entre_25_40);
            console.log(entre_40_55);
            console.log(entre_55_70);
            console.log(plus_70);

        res.status(201).json({entre_18_25,entre_25_40,entre_40_55,entre_55_70,plus_70});
        return ;
    }

exports.situation_familiale = (req, res, next) => {

    var celebataire=0,veuf=0;
    var marie=0,divorce=0;
        statistique().each(info => 
                {
                    if (info.info_generale.Situation_familliale=="célibataire")
                        {
                            celebataire=celebataire+1;
                        }
                    if (info.info_generale.Situation_familliale=="veuf")
                        {
                            veuf=veuf+1;
                        }
                    if (info.info_generale.Situation_familliale=="marié")
                        {
                            marie=marie+1;
                        }
                    if (info.info_generale.Situation_familliale=="divorce")
                        {
                            divorce=divorce+1;
                        }
                });  
                console.log("nombre des célibataires est :",+celebataire);
                console.log("nombre des veufs est :",+veuf);
                console.log("nombre des mariés est :",+marie); 
                console.log("nombre des divorces est :",+divorce); 
            
                res.status(201).json({celebataire,veuf,marie,divorce});
               
    }
    

exports.grade = (req, res, next) => {

    var entre_1_4=0,entre_5_9=0,entre_10_11=0,entre_12_15=0,plus_de_16=0;
        statistique().each(info => 
            {
                for (var i=0;i<info.nb_point_par_critere.length;i++)
                    {
                        if (info.nb_point_par_critere[i].categorie==="Grade")
                        {
                            if(info.nb_point_par_critere[i].criteres[0].nb_points!=0) {entre_1_4=entre_1_4+1};
                            if(info.nb_point_par_critere[i].criteres[1].nb_points!=0) {entre_5_9=entre_5_9+1};
                            if(info.nb_point_par_critere[i].criteres[2].nb_points!=0) {entre_10_11=entre_10_11+1};
                            if(info.nb_point_par_critere[i].criteres[3].nb_points!=0) {entre_12_15=entre_12_15+1};
                            if(info.nb_point_par_critere[i].criteres[4].nb_points!=0) {plus_de_16=plus_de_16+1};
                        }
              
                    }
               
            });  
            console.log("nombre des demandeurs qui on une grade entre_1_4 est :",+entre_1_4);
            console.log("nombre des demandeurs qui on une grade entre_5_9 est :",+entre_5_9);
            console.log("nombre des demandeurs qui on une grade entre_10_11 est :",+entre_10_11);
            console.log("nombre des demandeurs qui on une grade entre_12_15 est :",+entre_12_15);
            console.log("nombre des demandeurs qui on une grade plus_de_16 est :",+plus_de_16);

          res.status(201).json({entre_1_4,entre_5_9,entre_10_11,entre_12_15,plus_de_16});
       
    }