var historique = require('../Models/historique').Historique_db;
var user = require('../Models/user').User_db;
var ecrire = require('../Models/historique').ecrire;


exports.afficher = (req, res,next) => {
    res.json(historique().get());
    next();

}

exports.ajouter = (email,donnee) => {

    var obj =user({"email":email}).get();
    console.log(obj)
    let date_ob = new Date();
    let date1 = ("0" + date_ob.getDate()).slice(-2);
     // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours()+2;
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    var date=date1 + "-" + month + "-" + year ; 
    var heure= hours + ":" + minutes + ":" + seconds;
   historique.insert({
       "email":email,
       "type_profil":user({ "email": email }).select("type_profil")[0],
       "date":date,
       "heure":heure,
       "donnee":donnee,
    });
   ecrire();
}