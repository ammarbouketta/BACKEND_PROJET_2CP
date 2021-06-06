const TAFFY = require('taffy');
const fs = require("fs");
const Statistique_db = TAFFY();


var obj;
fs.readFile(process.env.Statistique_file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log("lecture faite avec succes");
    Statistique_db.insert(JSON.stringify(obj), null, 4);
});

exports.ecrire=()=>{
    fs.writeFile(process.env.Statistique_file, JSON.stringify(Statistique_db().get(), null, 4), (err) => { if (err) throw err; })
}
module.exports.Statistique_db = Statistique_db;