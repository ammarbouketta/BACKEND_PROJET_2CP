const TAFFY = require('taffy');
const fs = require("fs");
const Historique_db = TAFFY();

var obj;
fs.readFile(process.env.Historique_file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log("lecture faite avec succes");
    Historique_db.insert(JSON.stringify(obj), null, 4);
});

exports.ecrire=()=>{
    fs.writeFile(process.env.Historique_file, JSON.stringify(Historique_db().get(), null, 4), (err) => { if (err) throw err; })
}
module.exports.Historique_db = Historique_db;