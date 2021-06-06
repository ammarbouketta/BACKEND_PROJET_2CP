const TAFFY = require('taffy');
const fs = require("fs");
const Compagne_db = TAFFY();
const dotEnv = require("dotenv");


var obj;
fs.readFile(process.env.Compagne_file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log("lecture faite avec succes");
    Compagne_db.insert(JSON.stringify(obj), null, 4);
});

exports.ecrire=()=>{
    fs.writeFile(process.env.Compagne_file, JSON.stringify(Compagne_db().get(), null, 4), (err) => { if (err) throw err; })
}
module.exports.Compagne_db = Compagne_db;