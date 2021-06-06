const TAFFY = require('taffy');
const fs = require("fs");
const Demandeur_db = TAFFY();


var obj;
fs.readFile(process.env.Demandeur_file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log("lecture faite avec succes");
    Demandeur_db.insert(JSON.stringify(obj), null, 4);
});

exports.ecrire=()=>{
    fs.writeFile(process.env.Demandeur_file, JSON.stringify(Demandeur_db().get(), null, 4), (err) => { if (err) throw err; })
}
module.exports.Demandeur_db = Demandeur_db;