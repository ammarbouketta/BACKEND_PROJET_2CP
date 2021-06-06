const TAFFY = require('taffy');
const fs = require("fs");
const Critere_db = TAFFY();

var obj;
fs.readFile(process.env.Critere_file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log("lecture faite avec succes");
    Critere_db.insert(JSON.stringify(obj), null, 4);
});

exports.ecrire=()=>{
    fs.writeFile(process.env.Critere_file, JSON.stringify(Critere_db().get(), null, 4), (err) => { if (err) throw err; })
}
module.exports.Critere_db = Critere_db;