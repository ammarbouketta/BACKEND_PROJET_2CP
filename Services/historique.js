var historique = require('../Models/historique').Historique_db;
var user = require('../Models/user').User_db;
var ecrire = require('../Models/historique').ecrire;


exports.afficher = (req, res,next) => {
    res.json(historique().get());
    next();

}

exports.ajouter = (email,donnee) => {
   /* try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        console.log(userId);
        if (req.body.userId && req.body.userId !== userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      } catch {
       
      }*/
    var obj =user({"email":email}).get();
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
       "type_profil":obj.type_profil,
       "date":date,
       "heure":heure,
       "donnee":donnee,
    });
   ecrire();
}